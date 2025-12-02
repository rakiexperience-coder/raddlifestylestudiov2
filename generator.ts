
import { GoogleGenAI, Modality } from "@google/genai";
import { API_KEY_STORAGE_KEY, PRESET_PACKS } from "../constants";

export interface GenerateRequest {
  referenceFile: File;
  scene: string;
  vibe: string;
  outfit: string;
  hairstyle: string;
  hairColor: string;
  skin: string;
  lipStyle: string;
  aspect: string;
  height: string;
  bust: string;
  waist: string;
  hips: string;
  prompt: string;
  count: number;
}

// Helper to find detailed prompt from constants
function getPresetPrompt(sceneName: string): string {
  // 1. Check if sceneName matches a specific scene title in any pack
  for (const pack of PRESET_PACKS) {
    const matchedScene = pack.scenes.find(s => s.title === sceneName);
    if (matchedScene) {
      return matchedScene.prompt;
    }
  }

  // 2. Check if sceneName matches a Pack Name (e.g. "Global Luxe Escapes")
  // If so, pick a random scene from that pack
  const matchedPack = PRESET_PACKS.find(p => p.name === sceneName);
  if (matchedPack && matchedPack.scenes.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchedPack.scenes.length);
    return matchedPack.scenes[randomIndex].prompt;
  }

  // 3. Fallback: return the original string
  return sceneName;
}

// File → base64 (clean safe string)
function fileToGenerativePart(file: File) {
  return new Promise<{ inlineData: { data: string; mimeType: string } }>(
    (resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve({
          inlineData: {
            data: base64,
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }
  );
}

export async function generateLifestyleImages(req: GenerateRequest) {
  const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  if (!apiKey) {
    throw new Error("No API key found. Please add your Gemini API key.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-2.5-flash-image";

  const imagePart = await fileToGenerativePart(req.referenceFile);

  // Hair Color Logic
  const hairColorInstruction = (!req.hairColor || req.hairColor === "As in photo")
    ? "exactly the same as the reference image."
    : req.hairColor;

  // Resolve detailed scene prompt
  const detailedScene = getPresetPrompt(req.scene);

  const prompt = `
Create a luxurious high-end lifestyle portrait.

SCENE: ${detailedScene}
MOOD/VIBE: ${req.vibe}
OUTFIT STYLE: ${req.outfit}

IDENTITY RULES:
- Keep the exact same face & identity.
- Preserve skin tone, bone structure, and natural proportions.
- No distortions, no artifacts, no extra fingers.

APPEARANCE:
• Hairstyle: ${req.hairstyle}
• Hair Color: ${hairColorInstruction}
• Skin Style: ${req.skin}
• Lip Style: ${req.lipStyle}
• Height: ${req.height} (use this to adjust proportions realistically)
• Bust: ${req.bust}
• Waist: ${req.waist}
• Hips: ${req.hips}

Aspect Ratio: ${req.aspect}

Extra Enhancements: ${req.prompt || "None"}

STYLE:
- Ultra photorealistic
- High fashion editorial quality
- Expensive lighting, clean composition
`;

  const runs = Array.from({ length: req.count }).map(async () => {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: {
          parts: [imagePart, { text: prompt }],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const first = response.candidates?.[0]?.content?.parts?.[0];
      if (first?.inlineData?.data) {
        return `data:${first.inlineData.mimeType};base64,${first.inlineData.data}`;
      }

      return null;
    } catch (err) {
      console.error("Generation error:", err);
      return null;
    }
  });

  const results = await Promise.all(runs);
  const valid = results.filter((v): v is string => v !== null);

  if (valid.length === 0) {
    throw new Error("Failed to generate images. Try a different photo.");
  }

  return valid;
}
