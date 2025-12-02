
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import OptionSelector from './OptionSelector';
import { COLORS, HEIGHT_OPTIONS, BUST_OPTIONS, WAIST_OPTIONS, HIPS_OPTIONS, HAIRSTYLE_OPTIONS, HAIR_COLOR_OPTIONS, LIP_STYLE_OPTIONS } from '../constants';
import { generateLifestyleImages } from '../services/generator';

const StudioPage: React.FC = () => {
  // Image State
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Generated Images
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [scene, setScene] = useState("");
  const [vibe, setVibe] = useState("");
  const [outfit, setOutfit] = useState("");
  
  const [hairstyle, setHairstyle] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [skin, setSkin] = useState("");
  const [lipStyle, setLipStyle] = useState("");
  const [aspect, setAspect] = useState("");
  const [height, setHeight] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  
  // Count state maintained for generator API
  const [count, setCount] = useState(1);

  // Constants
  const SCENES = [
    // original core locations
    "Luxury Villa",
    "Private Jet",
    "Super Yacht",
    "Parisian Balcony",
    "Maldives Overwater Bungalow",
    "NYC Penthouse",
    "Santorini Cliffside",

    // new luxe “collection” style options
    "Global Luxe Escapes",
    "Elite Shopping Voyage",
    "Radiant Beauty Atelier",
    "Cozy Lumière Living",
    "Winter Wonderland Reverie",
    "Social Luxe Experiences",

    // extra lifestyle scenes Raki requested
    "Luxury Ski Resort",
    "Christmas Market Stroll",
    "Hibachi Dinner Show",
    "Rooftop Brunch View",
    "Wine Tasting Retreat",
    "Luxury Spa Sanctuary",
    "Resort Poolside Escapes"
  ];

  const VIBES = ["Morning Glow", "Sunset Golden Hour", "Night Luxe", "Cinematic", "Soft Minimalist", "High Editorial"];
  
  const OUTFITS = [
    "Elegant Gown", 
    "Chic Business", 
    "Resort Wear", 
    "Street Style", 
    "Old Money Aesthetic", 
    "Cocktail Attire",
    // New additions
    "Strapless black dress & opera gloves (Audrey-esque)",
    "Silver sequin mermaid gown (Luxury Editorial)",
    "Long-sleeve black satin gown (Runway Editorial)",
    "Blush satin mini dress (Barbiecore Editorial)",
    "Black satin slip dress (Shadow Play Editorial)",
    "Voluminous black ball gown (Hollywood Glamour)",
    "Tailored ivory blazer (Cosmetics Campaign)",
    "Tailored ivory pantsuit (Corporate Editorial)",
    "Deep-Emerald Blazer & Trousers (Modern Editorial)",
    "Taupe Suit & Crystal Clutch (Modern Editorial)",
    "Beige Trench & Wide-Leg Jeans",
    "Black Blazer & Trousers (Luxe Editorial)",
    "White Blazer Dress & Pearls (Executive Editorial)",
    "Boxy White Shirt & Vintage Jeans",
    "Trench coat & jeans (Weekend Brunch)",
    "Leopard-Print Knit Set",
    "Knit Polo & Pleated Mini Skirt",
    "Patchwork Tee & Charcoal Jeans",
    "Plaid Button-Down & Cropped Pants",
    "Fuzzy Cardigan & Distressed Jeans",
    "Pink Cardigan & Cable-Knit Skirt",
    "Striped Knit Mini Dress",
    "Striped Cardigan & Skinny Jeans",
    "Cobalt Shirt & Leather Pants",
    "Denim Blazer & Cow-Print Trousers",
    "Camel Blazer Mini Dress",
    "Monochrome peach suit",
    "Rust Pinafore Mini Skirt",
    "Plush white spa robe (Luxe Editorial)",
    "Black One-Piece with Crystal 'YSL' Cassandre Logo on Chest",
    "Beige & Ebony 'GG' Gucci Monogram One-Shoulder Swimsuit",
    "Yellow & Brown 'GG' Gucci Monogram Triangle Bikini",
    "Red One-Piece with Large White 'BALMAIN' Text Across Chest",
    "Geometric 'PB' Balmain Monogram Deep-V Swimsuit with Gold B-Belt",
    "Black One-Piece with Gold 'Versace' Greek Key Waistband & Medusa Logo",
    "White One-Shoulder Swimsuit with 3D Orchid Flower Strap",
    "Black High-Waisted Bikini with Sheer Mesh Cut-Out Panels",
    "Black and White Color-Block One-Piece with Center CC Logo"
  ];
  
  const SKINS = ["Fair", "Light", "Medium", "Olive", "Tan", "Dark", "Deep"];
  const ASPECTS = ["1:1 (Square)", "9:16 (Story)", "16:9 (Landscape)", "4:5 (Portrait)"];

  const handleGenerate = async () => {
    if (!referenceFile) {
      alert("Please upload a reference photo to begin your transformation.");
      return;
    }

    if (!scene) {
      alert("Please select a Lifestyle Setting.");
      return;
    }
    
    setLoading(true);
    setGeneratedImages([]);

    try {
      const images = await generateLifestyleImages({
        referenceFile,
        scene,
        vibe,
        outfit,
        hairstyle,
        hairColor,
        skin,
        lipStyle,
        aspect,
        height,
        bust,
        waist,
        hips,
        prompt: "", 
        count,
      });

      setGeneratedImages(images);
      
      // Auto scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err: any) {
      alert(err.message || "Something went wrong during generation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-softCharcoal font-sans selection:bg-raddGold/20 pb-20">
      
      {/* Navbar / Header */}
      <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-raddGold/10 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-light tracking-widest text-raddGold uppercase">RADD</h1>
          <p className="text-[10px] tracking-[0.3em] text-softCharcoal/60 uppercase">Lifestyle Studio</p>
        </div>
        <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-raddGold/20 to-transparent flex items-center justify-center border border-raddGold/20 text-raddGold shadow-sm">
            <span className="text-xs font-bold">R</span>
            </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-16">
        
        {/* 1. Upload Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-full bg-raddGold text-white flex items-center justify-center text-sm font-medium shadow-lg shadow-raddGold/20">1</div>
             <h2 className="text-xl font-light text-softCharcoal tracking-wide">Start With Your Photo</h2>
          </div>
          <div className="bg-white p-2 rounded-[24px] shadow-sm border border-gray-100">
             <ImageUploader 
               onImageUpload={(file) => {
                 setReferenceFile(file);
                 setImagePreview(URL.createObjectURL(file));
               }}
               imagePreview={imagePreview}
             />
          </div>
        </section>

        {/* 2. Customize Scenes */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-full bg-raddGold text-white flex items-center justify-center text-sm font-medium shadow-lg shadow-raddGold/20">2</div>
             <h2 className="text-xl font-light text-softCharcoal tracking-wide">Choose Your Lifestyle Setting</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <OptionSelector
               label="Lifestyle Setting"
               value={scene}
               onChange={setScene}
               options={SCENES}
               placeholder="Select Scene"
             />

             <OptionSelector
               label="Setting Mood"
               value={vibe}
               onChange={setVibe}
               options={VIBES}
               placeholder="Select Vibe"
             />

             <OptionSelector
               label="Signature Attire"
               value={outfit}
               onChange={setOutfit}
               options={OUTFITS}
               placeholder="Select Outfit"
             />
          </div>
        </section>

        {/* 3. Refine Appearance */}
        <section className="space-y-6">
           <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-full bg-raddGold text-white flex items-center justify-center text-sm font-medium shadow-lg shadow-raddGold/20">3</div>
             <h2 className="text-xl font-light text-softCharcoal tracking-wide">Personalize Your Twin</h2>
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-lg shadow-gray-100/50 border border-gray-100 space-y-8 relative overflow-hidden">
             {/* Decorative Background Element */}
            <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none blur-3xl -translate-y-1/2 translate-x-1/3"
                style={{ background: `radial-gradient(circle, ${COLORS.GOLD} 0%, transparent 70%)` }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <OptionSelector label="Hairstyle" value={hairstyle} onChange={setHairstyle} options={HAIRSTYLE_OPTIONS} />
               <OptionSelector label="Hair Color" value={hairColor} onChange={setHairColor} options={HAIR_COLOR_OPTIONS} />
               <OptionSelector label="Skin Style" value={skin} onChange={setSkin} options={SKINS} />
               <OptionSelector label="Lip Style" value={lipStyle} onChange={setLipStyle} options={LIP_STYLE_OPTIONS} />
            </div>
            
            <div className="h-px w-full bg-gray-50"></div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              <div className="col-span-2 md:col-span-1">
                 <OptionSelector label="Aspect Ratio" value={aspect} onChange={setAspect} options={ASPECTS} />
              </div>
              <OptionSelector label="Height" value={height} onChange={setHeight} options={HEIGHT_OPTIONS} />
              <OptionSelector label="Bust" value={bust} onChange={setBust} options={BUST_OPTIONS} />
              <OptionSelector label="Waist" value={waist} onChange={setWaist} options={WAIST_OPTIONS} />
              <OptionSelector label="Hips" value={hips} onChange={setHips} options={HIPS_OPTIONS} />
            </div>
          </div>
        </section>

        {/* 4. Generation Settings */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-raddGold text-white flex items-center justify-center text-sm font-medium shadow-lg shadow-raddGold/20">4</div>
            <h2 className="text-xl font-light text-softCharcoal tracking-wide">Generation Settings</h2>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100 space-y-8">
            <div>
              <label className="block text-sm font-medium mb-2 text-softCharcoal">Number of Images</label>
              <input
                type="range"
                min={1}
                max={8}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-raddGold"
              />
              <p className="text-xs mt-1 text-softCharcoal/60">Selected: {count}</p>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="pt-8">
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full md:max-w-lg mx-auto block py-5 rounded-full bg-gradient-to-r from-raddGold to-[#8e6f32] text-white text-lg font-semibold tracking-widest shadow-xl shadow-raddGold/25 hover:shadow-raddGold/40 hover:-translate-y-1 transition-all duration-300 active:translate-y-0 active:shadow-sm ${loading ? 'opacity-80 cursor-wait' : ''}`}
            >
            {loading ? "Revealing..." : "✨ Reveal My Signature Look"}
            </button>
        </div>

        {/* 5. Results Section (Your Portfolio) */}
        {(generatedImages.length > 0 || loading) && (
          <section id="results-section" className="space-y-6 pt-8 border-t border-gray-100">
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 rounded-full bg-raddGold text-white flex items-center justify-center text-sm font-medium shadow-lg shadow-raddGold/20">5</div>
               <h2 className="text-xl font-light text-softCharcoal tracking-wide">Your Portfolio</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading && Array.from({ length: count }).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center border border-gray-200">
                  <div className="text-raddGold/30">
                    <svg className="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
              ))}
              
              {!loading && generatedImages.map((img, idx) => (
                <div key={idx} className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                  <img src={img} alt={`Generated ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <a href={img} download={`radd-lifestyle-${idx}.png`} className="bg-white/90 text-raddGold px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
      
      <footer className="w-full text-center py-8 border-t border-raddGold/5 bg-white/40 mt-12">
        <p className="text-xs text-softCharcoal/40 font-light tracking-wide">
          Created by Raki AI Digital DEN © 2025
        </p>
      </footer>
    </div>
  );
};

export default StudioPage;
