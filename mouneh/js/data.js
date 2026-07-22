/* Product catalogue for the Mouneh trading post.
   jarType controls which CSS jar swatch renders on cards/detail (no image files needed). */
const PRODUCTS = [
  { id:"p01", name:"Cold-Pressed Olive Oil", vendor:"Bayt Zeitouna, Nabatieh", kind:"Oils", region:"NABATIEH", year:"'25", price:24, unit:"750ml tin", jarType:"olive-fill", desc:"First cold-press from a single hillside grove, bottled within 48 hours of harvest. Peppery finish, low acidity.", stock:42, weight:"750 ml", harvest:"Nov 2025", method:"Stone-milled, cold press" },
  { id:"p02", name:"Pomegranate Molasses (Dibs Rumman)", vendor:"Umm Hassan's Kitchen, Homs", kind:"Syrups", region:"HOMS", year:"'25", price:14, unit:"500ml jar", jarType:"pomegranate", desc:"Slow-reduced over wood fire for six hours, no added sugar. Tart, dark, and thick enough to coat a spoon.", stock:30, weight:"500 ml", harvest:"Oct 2025", method:"Wood-fired reduction" },
  { id:"p03", name:"Makdous (Baby Eggplant in Oil)", vendor:"Dayaa Preserves, Idlib", kind:"Preserves", region:"IDLIB", year:"'25", price:18, unit:"1kg jar", jarType:"olive-fill", desc:"Baby eggplants stuffed with walnut, red pepper, and garlic, cured under olive oil for three weeks.", stock:19, weight:"1 kg", harvest:"Sep 2025", method:"Salt-cured, oil-packed" },
  { id:"p04", name:"Dried Kishk (Fermented Grain)", vendor:"Bekaa Valley Co-op", kind:"Grains", region:"BEQAA", year:"'24", price:12, unit:"400g bag", jarType:"cream", desc:"Bulgur fermented with goat's milk yoghurt, sun-dried for eight days and hand-ground.", stock:56, weight:"400 g", harvest:"Aug 2024", method:"Fermented, sun-dried" },
  { id:"p05", name:"Wild Thyme Za'atar Blend", vendor:"Jabal Amel Herbary, South Lebanon", kind:"Herbs", region:"JABAL AMEL", year:"'25", price:9, unit:"250g pouch", jarType:"olive-fill", desc:"Hand-picked wild thyme, toasted sesame, sumac and salt — mixed the morning it ships.", stock:70, weight:"250 g", harvest:"Jun 2025", method:"Sun-dried, hand-mixed" },
  { id:"p06", name:"Torshi Mkhalel (Mixed Pickles)", vendor:"Rima's Larder, Aleppo", kind:"Pickles", region:"ALEPPO", year:"'25", price:11, unit:"1kg jar", jarType:"pomegranate", desc:"Turnip, cucumber and cauliflower brined with beet, garlic and coriander seed for tang and colour.", stock:38, weight:"1 kg", harvest:"May 2025", method:"Brine-fermented" },
  { id:"p07", name:"Apricot & Rosewater Preserve", vendor:"Ghouta Orchards, Damascus", kind:"Preserves", region:"GHOUTA", year:"'25", price:15, unit:"400g jar", jarType:"gold", desc:"Damascene apricots simmered with rosewater and blanched almonds, set soft rather than jammy.", stock:26, weight:"400 g", harvest:"Jul 2025", method:"Slow-simmered" },
  { id:"p08", name:"Freekeh (Smoked Green Wheat)", vendor:"Hauran Plains Farmers", kind:"Grains", region:"HAURAN", year:"'25", price:10, unit:"1kg bag", jarType:"cream", desc:"Young durum wheat harvested green and fire-roasted in the field for a smoky, nutty grain.", stock:64, weight:"1 kg", harvest:"May 2025", method:"Fire-roasted" },
  { id:"p09", name:"Labneh Balls in Oil", vendor:"Bayt Zeitouna, Nabatieh", kind:"Preserves", region:"NABATIEH", year:"'25", price:16, unit:"600g jar", jarType:"cream", desc:"Strained yoghurt rolled by hand, salted, and submerged in the estate's own olive oil with dried mint.", stock:22, weight:"600 g", harvest:"Jun 2025", method:"Strained, oil-packed" },
  { id:"p10", name:"Green Table Olives, Cracked", vendor:"Jabal Amel Herbary, South Lebanon", kind:"Pickles", region:"JABAL AMEL", year:"'24", price:13, unit:"800g jar", jarType:"olive-fill", desc:"Cracked and cured in brine with lemon and wild fennel for four months before jarring.", stock:33, weight:"800 g", harvest:"Nov 2024", method:"Brine-cured" },
  { id:"p11", name:"Carob Molasses (Dibs Kharoub)", vendor:"Umm Hassan's Kitchen, Homs", kind:"Syrups", region:"HOMS", year:"'24", price:13, unit:"500ml jar", jarType:"gold", desc:"Pressed and reduced from wild carob pods; earthy and only lightly sweet, unlike refined syrups.", stock:29, weight:"500 ml", harvest:"Sep 2024", method:"Cold-pressed, reduced" },
  { id:"p12", name:"Sumac-Onion Preserve", vendor:"Dayaa Preserves, Idlib", kind:"Preserves", region:"IDLIB", year:"'25", price:8, unit:"300g jar", jarType:"pomegranate", desc:"Caramelised onion cooked down with tart sumac — a spread for manakish or a topping for grains.", stock:41, weight:"300 g", harvest:"Apr 2025", method:"Slow-cooked" }
];

const CATEGORIES = [
  { name:"Oils & Pressed Goods", kind:"Oils", note:"Cold-pressed, single-estate" },
  { name:"Jams & Preserves",     kind:"Preserves", note:"Fruit, dairy, vegetable" },
  { name:"Pickled Mkhalel",      kind:"Pickles", note:"Brined and fermented" },
  { name:"Syrups & Molasses",    kind:"Syrups", note:"Pomegranate, carob, grape" },
  { name:"Grains & Kishk",       kind:"Grains", note:"Fermented, sun-dried" },
  { name:"Dried Herbs & Blends", kind:"Herbs", note:"Za'atar, sumac, thyme" }
];

function jarSwatch(jarType, size){
  const cls = {
    "olive-fill":"olive-fill", "pomegranate":"pomegranate", "cream":"cream", "gold":""
  }[jarType] || "";
  const w = size || 74, h = Math.round(w*1.24);
  return `<div class="jar-swatch jar-body ${cls}" style="width:${w}px;height:${h}px;"></div>`;
}

function money(n){ return "$" + n.toFixed(2); }

function findProduct(id){ return PRODUCTS.find(p => p.id === id); }
