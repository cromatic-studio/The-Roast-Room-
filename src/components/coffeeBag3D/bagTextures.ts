import * as THREE from 'three';

/**
 * Generates an ultra-crisp, high-DPI CanvasTexture for the Front face of the coffee bag.
 */
export function createFrontTexture(anisotropy = 4): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  // 1. Base Pouch Background: Deep Forest Green
  ctx.fillStyle = '#1B3D3C';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle organic vignette gradient
  const bgGrad = ctx.createRadialGradient(1024, 1100, 200, 1024, 1100, 1200);
  bgGrad.addColorStop(0, 'rgba(38, 78, 77, 0.45)');
  bgGrad.addColorStop(1, 'rgba(18, 40, 39, 0.85)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Top Heat-Sealed Crimp Header (Y: 0 to 220)
  ctx.fillStyle = '#132827';
  ctx.fillRect(0, 0, canvas.width, 220);

  // Vertical crimp lines
  ctx.strokeStyle = '#234a49';
  ctx.lineWidth = 3.5;
  for (let x = 20; x < canvas.width; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, 8);
    ctx.lineTo(x, 210);
    ctx.stroke();

    // Dark groove right next to highlight
    ctx.strokeStyle = '#0d1c1b';
    ctx.beginPath();
    ctx.moveTo(x + 5, 8);
    ctx.lineTo(x + 5, 210);
    ctx.stroke();
    ctx.strokeStyle = '#234a49';
  }

  // Horizontal seal dividing line & zip lock line
  ctx.strokeStyle = '#0a1716';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, 218);
  ctx.lineTo(canvas.width, 218);
  ctx.stroke();

  // Tear notches on left and right
  ctx.fillStyle = '#F9F6EA';
  // Left notch
  ctx.beginPath();
  ctx.moveTo(0, 160);
  ctx.lineTo(36, 175);
  ctx.lineTo(0, 190);
  ctx.closePath();
  ctx.fill();
  // Right notch
  ctx.beginPath();
  ctx.moveTo(canvas.width, 160);
  ctx.lineTo(canvas.width - 36, 175);
  ctx.lineTo(canvas.width, 190);
  ctx.closePath();
  ctx.fill();

  // 3. Top Sage Coffee Foliage (Top Left)
  ctx.save();
  ctx.strokeStyle = '#8FA894';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(120, 280);
  ctx.bezierCurveTo(180, 320, 240, 390, 260, 460);
  ctx.stroke();

  // Leaves along branch
  const drawLeaf = (lx: number, ly: number, angle: number, scale = 1) => {
    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.ellipse(0, 0, 32, 14, 0, 0, Math.PI * 2);
    ctx.strokeStyle = '#8FA894';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-32, 0);
    ctx.lineTo(32, 0);
    ctx.stroke();
    ctx.restore();
  };

  drawLeaf(150, 310, -0.6, 1.1);
  drawLeaf(175, 300, 0.7, 1.0);
  drawLeaf(205, 360, -0.5, 1.2);
  drawLeaf(230, 380, 0.8, 1.1);
  drawLeaf(255, 430, -0.4, 0.9);
  ctx.restore();

  // 4. Vegetarian Indicator Mark (Top Right)
  ctx.save();
  ctx.strokeStyle = '#238823';
  ctx.lineWidth = 5;
  ctx.strokeRect(1880, 260, 68, 68);
  ctx.fillStyle = '#238823';
  ctx.beginPath();
  ctx.arc(1914, 294, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 5. Brand Lockup: THE ROAST ROOM COFFEE ROASTERS
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F9F6EA';

  // "THE"
  ctx.font = '800 38px "Outfit", sans-serif';
  ctx.letterSpacing = '14px';
  ctx.fillText('THE', 1024, 380);

  // "ROAST"
  ctx.font = '900 132px "Outfit", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('ROAST', 1024, 500);

  // "ROOM" with bean as first 'O'
  ctx.font = '900 132px "Outfit", sans-serif';
  ctx.letterSpacing = '4px';
  // Measure 'R'
  const rWidth = ctx.measureText('R').width;
  const oWidth = ctx.measureText('O').width;
  const mWidth = ctx.measureText('M').width;
  const beanWidth = 92;
  const totalRoomWidth = rWidth + beanWidth + oWidth + mWidth + 40;
  let currX = 1024 - totalRoomWidth / 2;

  // 'R'
  ctx.textAlign = 'left';
  ctx.fillText('R', currX, 620);
  currX += rWidth + 12;

  // Bean as first 'O'
  ctx.save();
  const beanCenterY = 578;
  const beanCenterX = currX + beanWidth / 2;
  ctx.translate(beanCenterX, beanCenterY);
  ctx.rotate(-0.1);
  // Outer bean body
  ctx.fillStyle = '#F9F6EA';
  ctx.beginPath();
  ctx.ellipse(0, 0, 42, 54, 0, 0, Math.PI * 2);
  ctx.fill();
  // Inner hollow
  ctx.fillStyle = '#1B3D3C';
  ctx.beginPath();
  ctx.ellipse(0, 0, 31, 44, 0, 0, Math.PI * 2);
  ctx.fill();
  // Bean wavy cleft
  ctx.strokeStyle = '#F9F6EA';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, -42);
  ctx.bezierCurveTo(-14, -15, 14, 15, 0, 42);
  ctx.stroke();
  ctx.restore();
  currX += beanWidth + 14;

  // 'O' and 'M'
  ctx.fillStyle = '#F9F6EA';
  ctx.fillText('O', currX, 620);
  currX += oWidth + 8;
  ctx.fillText('M', currX, 620);

  // "COFFEE ROASTERS" + underline
  ctx.textAlign = 'center';
  ctx.font = '700 34px "Outfit", sans-serif';
  ctx.letterSpacing = '10px';
  ctx.fillText('COFFEE ROASTERS', 1024, 690);

  // Decorative brush underline
  ctx.strokeStyle = '#F9F6EA';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(760, 715);
  ctx.quadraticCurveTo(1024, 735, 1288, 715);
  ctx.stroke();
  ctx.restore();

  // 6. Degassing Aroma Valve Location Marker (Y ≈ 780)
  ctx.save();
  ctx.beginPath();
  ctx.arc(1024, 785, 34, 0, Math.PI * 2);
  ctx.fillStyle = '#122625';
  ctx.fill();
  ctx.strokeStyle = '#295452';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(1024, 785, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#081211';
  ctx.fill();
  ctx.restore();

  // 7. Center Roasted Coffee Beans Hero Illustration (Y: 820 to 1100)
  ctx.save();
  const drawRoastedBean = (
    cx: number,
    cy: number,
    angle: number,
    scale: number,
    isLeft: boolean
  ) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    // Drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetX = isLeft ? -10 : 12;
    ctx.shadowOffsetY = 16;

    // Bean outer shape
    const beanGrad = ctx.createLinearGradient(-70, -110, 80, 110);
    beanGrad.addColorStop(0, '#5A301E');
    beanGrad.addColorStop(0.45, '#422114');
    beanGrad.addColorStop(1, '#24110A');

    ctx.fillStyle = beanGrad;
    ctx.beginPath();
    ctx.moveTo(0, -100);
    ctx.bezierCurveTo(80, -95, 95, 75, 0, 105);
    ctx.bezierCurveTo(-95, 75, -80, -95, 0, -100);
    ctx.fill();

    // Disable shadow for inner cleft
    ctx.shadowColor = 'transparent';

    // Specular highlight crest
    const specGrad = ctx.createRadialGradient(-20, -35, 10, -20, -35, 75);
    specGrad.addColorStop(0, 'rgba(217, 130, 80, 0.45)');
    specGrad.addColorStop(0.5, 'rgba(140, 70, 35, 0.15)');
    specGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = specGrad;
    ctx.fill();

    // Roasted bean center cleft
    ctx.strokeStyle = '#180A04';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, -82);
    ctx.bezierCurveTo(isLeft ? 26 : -26, -30, isLeft ? -26 : 26, 30, 0, 84);
    ctx.stroke();

    // Golden roast inner split line
    ctx.strokeStyle = '#D95F2D';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(0, -78);
    ctx.bezierCurveTo(isLeft ? 24 : -24, -28, isLeft ? -24 : 28, 28, 0, 80);
    ctx.stroke();

    ctx.restore();
  };

  // Two overlapping coffee beans
  drawRoastedBean(890, 960, -0.26, 1.25, true);
  drawRoastedBean(1150, 970, 0.22, 1.30, false);
  ctx.restore();

  // 8. Burnt Orange Organic Wave Divider (Y: 1080 to 1180)
  ctx.save();
  ctx.fillStyle = '#D95F2D';
  ctx.beginPath();
  ctx.moveTo(0, 1140);
  ctx.bezierCurveTo(340, 1080, 760, 1180, 1180, 1090);
  ctx.bezierCurveTo(1540, 1020, 1840, 1150, 2048, 1100);
  ctx.lineTo(2048, 1260);
  ctx.lineTo(0, 1260);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 9. Cream Craft Specification Label Card (Y: 1200 to 1980, centered)
  const cardX = 110;
  const cardY = 1190;
  const cardW = 1828;
  const cardH = 780;
  const cardR = 36;

  ctx.save();
  // Card Drop Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 18;

  // Card background
  ctx.fillStyle = '#F9F6EA';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, cardR);
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = '#E5DFC8';
  ctx.lineWidth = 3;
  ctx.stroke();

  // --- Card Left Column: Headline & Origin ---
  const padLeft = cardX + 64;
  ctx.textAlign = 'left';

  // "SINGLE ORIGIN"
  ctx.fillStyle = '#6E8A73';
  ctx.font = '800 32px "Outfit", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('SINGLE ORIGIN', padLeft, cardY + 75);

  // "RATNAGIRI"
  ctx.fillStyle = '#1B3D3C';
  ctx.font = '900 82px "Outfit", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('RATNAGIRI', padLeft, cardY + 160);

  // "YC-17" + Orange Pill Badge
  ctx.font = '800 48px "Outfit", sans-serif';
  ctx.fillText('YC-17', padLeft, cardY + 230);

  // Orange Pill: "80% ARABICA | 20% ROBUSTA"
  const pillX = padLeft + 190;
  const pillY = cardY + 188;
  const pillW = 440;
  const pillH = 50;
  ctx.fillStyle = '#D95F2D';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 25);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('80% ARABICA | 20% ROBUSTA', pillX + 32, pillY + 34);

  // Cup Notes Block
  ctx.fillStyle = '#6E8A73';
  ctx.font = '800 24px "Outfit", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('CUP NOTES', padLeft, cardY + 310);

  ctx.fillStyle = '#1B3D3C';
  ctx.font = '700 40px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Jasmin Tea, Raspberry & Nutty', padLeft, cardY + 360);

  // --- Card Right Column: 2x2 Specs Grid ---
  const gridX = cardX + 1040;
  const colW = 360;

  // Spec Item 1: ORIGIN
  ctx.fillStyle = '#6E8A73';
  ctx.font = '700 24px "Outfit", sans-serif';
  ctx.fillText('ORIGIN', gridX, cardY + 75);
  ctx.fillStyle = '#1B3D3C';
  ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('📍 Ratnagiri Estate', gridX, cardY + 118);

  // Spec Item 2: ROAST PROFILE
  ctx.fillStyle = '#6E8A73';
  ctx.font = '700 24px "Outfit", sans-serif';
  ctx.fillText('ROAST PROFILE', gridX + colW, cardY + 75);
  ctx.fillStyle = '#D95F2D';
  ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('🔥 Light Roast', gridX + colW, cardY + 118);

  // Spec Item 3: PROCESS
  ctx.fillStyle = '#6E8A73';
  ctx.font = '700 24px "Outfit", sans-serif';
  ctx.fillText('PROCESS', gridX, cardY + 195);
  ctx.fillStyle = '#1B3D3C';
  ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Culture Natural', gridX, cardY + 238);

  // Spec Item 4: ROASTED FOR
  ctx.fillStyle = '#6E8A73';
  ctx.font = '700 24px "Outfit", sans-serif';
  ctx.fillText('ROASTED FOR', gridX + colW, cardY + 195);
  ctx.fillStyle = '#1B3D3C';
  ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Signature Bar', gridX + colW, cardY + 238);

  // Divider Line
  ctx.strokeStyle = '#E0D8BD';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, cardY + 440);
  ctx.lineTo(cardX + cardW - 64, cardY + 440);
  ctx.stroke();

  // --- Bottom Specs Bar ---
  const bottomY = cardY + 490;

  // Best Brewed With
  ctx.fillStyle = '#6E8A73';
  ctx.font = '700 22px "Outfit", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('BEST BREWED WITH', padLeft, bottomY);

  // Brewing Icons
  const drawBrewMethod = (x: number, y: number, name: string) => {
    ctx.strokeStyle = '#1B3D3C';
    ctx.fillStyle = '#1B3D3C';
    ctx.lineWidth = 3;

    if (name === 'pourover') {
      ctx.beginPath();
      ctx.moveTo(x - 22, y);
      ctx.lineTo(x + 22, y);
      ctx.lineTo(x + 12, y + 26);
      ctx.lineTo(x - 12, y + 26);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + 26);
      ctx.lineTo(x, y + 42);
      ctx.moveTo(x - 14, y + 42);
      ctx.lineTo(x + 14, y + 42);
      ctx.stroke();
    } else if (name === 'frenchpress') {
      ctx.strokeRect(x - 16, y + 4, 32, 40);
      ctx.beginPath();
      ctx.moveTo(x, y - 6);
      ctx.lineTo(x, y + 4);
      ctx.moveTo(x - 12, y - 6);
      ctx.lineTo(x + 12, y - 6);
      ctx.moveTo(x - 16, y + 22);
      ctx.lineTo(x + 16, y + 22);
      ctx.stroke();
    } else if (name === 'aeropress') {
      ctx.strokeRect(x - 12, y + 6, 24, 38);
      ctx.beginPath();
      ctx.moveTo(x, y - 6);
      ctx.lineTo(x, y + 6);
      ctx.moveTo(x - 16, y - 6);
      ctx.lineTo(x + 16, y - 6);
      ctx.stroke();
    } else if (name === 'espresso') {
      ctx.beginPath();
      ctx.arc(x, y + 20, 20, 0, Math.PI);
      ctx.lineTo(x - 20, y + 20);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 22, y + 20, 8, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();
    }
  };

  drawBrewMethod(padLeft + 40, bottomY + 36, 'pourover');
  drawBrewMethod(padLeft + 130, bottomY + 36, 'frenchpress');
  drawBrewMethod(padLeft + 220, bottomY + 36, 'aeropress');
  drawBrewMethod(padLeft + 310, bottomY + 36, 'espresso');

  // Roasted On
  const colRoastX = cardX + 960;
  ctx.fillStyle = '#6E8A73';
  ctx.font = '700 22px "Outfit", sans-serif';
  ctx.fillText('ROASTED ON', colRoastX, bottomY);
  ctx.fillStyle = '#1B3D3C';
  ctx.font = '700 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Fresh Weekly', colRoastX, bottomY + 50);

  // Net Weight
  const colNetX = cardX + 1440;
  ctx.fillStyle = '#6E8A73';
  ctx.font = '700 22px "Outfit", sans-serif';
  ctx.fillText('NET WEIGHT', colNetX, bottomY);
  ctx.fillStyle = '#1B3D3C';
  ctx.font = '900 52px "Outfit", sans-serif';
  ctx.fillText('1 KG', colNetX, bottomY + 54);

  ctx.restore();

  // Create Three.js CanvasTexture
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates an ultra-crisp, high-DPI CanvasTexture for the Back face of the coffee bag.
 */
export function createBackTexture(anisotropy = 4): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  // 1. Base Pouch Background: Deep Forest Green
  ctx.fillStyle = '#1B3D3C';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const bgGrad = ctx.createRadialGradient(1024, 1024, 150, 1024, 1024, 1200);
  bgGrad.addColorStop(0, 'rgba(32, 70, 69, 0.45)');
  bgGrad.addColorStop(1, 'rgba(14, 32, 31, 0.85)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Top Crimp Header
  ctx.fillStyle = '#132827';
  ctx.fillRect(0, 0, canvas.width, 220);

  ctx.strokeStyle = '#234a49';
  ctx.lineWidth = 3.5;
  for (let x = 20; x < canvas.width; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, 8);
    ctx.lineTo(x, 210);
    ctx.stroke();
    ctx.strokeStyle = '#0d1c1b';
    ctx.beginPath();
    ctx.moveTo(x + 5, 8);
    ctx.lineTo(x + 5, 210);
    ctx.stroke();
    ctx.strokeStyle = '#234a49';
  }

  // 3. Central Fin Seal Spine (characteristic back seal of coffee bags)
  ctx.save();
  const finGrad = ctx.createLinearGradient(1012, 0, 1036, 0);
  finGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
  finGrad.addColorStop(0.5, 'rgba(40, 85, 84, 0.55)');
  finGrad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
  ctx.fillStyle = finGrad;
  ctx.fillRect(1016, 220, 16, 1828);
  ctx.restore();

  // 4. Back Brand Title
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F9F6EA';
  ctx.font = '800 36px "Outfit", sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('THE ROAST ROOM', 1024, 320);

  ctx.font = '700 24px "Outfit", sans-serif';
  ctx.letterSpacing = '5px';
  ctx.fillStyle = '#8FA894';
  ctx.fillText('CRAFT COFFEE ROASTERS • LUCKNOW', 1024, 365);

  // 5. Headline: "EVERY BEAN TELLS A STORY"
  ctx.fillStyle = '#F9F6EA';
  ctx.font = '900 64px "Outfit", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('EVERY BEAN TELLS A STORY', 1024, 460);

  // Story Paragraph
  ctx.font = '500 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#E8E4D5';
  const storyLine1 = 'At The Roast Room, we source exceptional green coffees, roast them by hand with';
  const storyLine2 = 'precision heat profiles, and share stories connecting origin farms to daily cups.';
  const storyLine3 = 'A celebration of growers, baristas, and the craft that brings them together.';
  ctx.fillText(storyLine1, 1024, 530);
  ctx.fillText(storyLine2, 1024, 580);
  ctx.fillText(storyLine3, 1024, 630);
  ctx.restore();

  // 6. Two-Column Information Cards
  // --- Left Column ---
  const leftColX = 140;
  const colWidth = 800;

  ctx.save();
  ctx.textAlign = 'left';

  // Section: STORAGE
  ctx.fillStyle = '#D95F2D';
  ctx.font = '800 28px "Outfit", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('STORAGE INSTRUCTIONS', leftColX, 760);

  ctx.fillStyle = '#F9F6EA';
  ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Store in a cool, dry place away from direct sunlight', leftColX, 810);
  ctx.fillText('and moisture. Reseal pouch tightly after opening with the', leftColX, 850);
  ctx.fillText('degassing valve intact. Best consumed within 30 days.', leftColX, 890);

  // Section: INGREDIENTS
  ctx.fillStyle = '#D95F2D';
  ctx.font = '800 28px "Outfit", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('INGREDIENTS', leftColX, 980);

  ctx.fillStyle = '#F9F6EA';
  ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('100% Pure Roasted Whole Bean Coffee.', leftColX, 1030);
  ctx.fillText('No artificial additives, chicory, or preservatives.', leftColX, 1070);

  // Section: FSSAI Compliance Box
  const fssaiY = 1170;
  ctx.strokeStyle = '#8FA894';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(leftColX, fssaiY, colWidth, 140);

  ctx.fillStyle = '#F9F6EA';
  ctx.font = '800 38px "Outfit", sans-serif';
  ctx.fillText('fssai', leftColX + 36, fssaiY + 60);

  ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Lic. No. 12724055000421', leftColX + 160, fssaiY + 60);

  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#8FA894';
  ctx.fillText('Registered Food Business Operator (FSSAI)', leftColX + 36, fssaiY + 105);

  // Social Community
  ctx.fillStyle = '#F9F6EA';
  ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('📸 @theroastroom.coffee', leftColX, 1380);
  ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#8FA894';
  ctx.fillText('Share your daily brew setups with us', leftColX, 1420);

  ctx.restore();

  // --- Right Column ---
  const rightColX = 1100;

  ctx.save();
  ctx.textAlign = 'left';

  // Section: MANUFACTURED & PACKED BY
  ctx.fillStyle = '#D95F2D';
  ctx.font = '800 28px "Outfit", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('MANUFACTURED & PACKED BY', rightColX, 760);

  ctx.fillStyle = '#F9F6EA';
  ctx.font = '800 30px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('THE ROAST ROOM COFFEE ROASTERS', rightColX, 810);

  ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Ground floor, 1/59, Vastu Khand,', rightColX, 855);
  ctx.fillText('Gomti Nagar, Lucknow 226010,', rightColX, 895);
  ctx.fillText('Uttar Pradesh, India.', rightColX, 935);

  // Section: FEEDBACK & QUERIES
  ctx.fillStyle = '#D95F2D';
  ctx.font = '800 28px "Outfit", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('CUSTOMER SUPPORT & SAMPLES', rightColX, 1020);

  ctx.fillStyle = '#F9F6EA';
  ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Direct: +91 9310034617', rightColX, 1070);
  ctx.fillText('Email: hello@theroastroom.in', rightColX, 1110);
  ctx.fillText('Web: theroastroom.in', rightColX, 1150);

  // Commercial Batch Data Card (Bottom Right Box)
  const batchY = 1250;
  ctx.fillStyle = '#F9F6EA';
  ctx.beginPath();
  ctx.roundRect(rightColX, batchY, colWidth, 310, 24);
  ctx.fill();

  ctx.fillStyle = '#1B3D3C';
  ctx.font = '800 24px "Outfit", sans-serif';
  ctx.fillText('COMMERCIAL BATCH SPECIFICATIONS', rightColX + 36, batchY + 50);

  const drawBatchRow = (label: string, val: string, yPos: number, isBold = false) => {
    ctx.fillStyle = '#6E8A73';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(label, rightColX + 36, yPos);
    ctx.fillStyle = '#1B3D3C';
    ctx.font = isBold ? '900 30px "Plus Jakarta Sans", sans-serif' : '700 26px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val, rightColX + colWidth - 36, yPos);
    ctx.textAlign = 'left';
  };

  drawBatchRow('MRP (Inclusive of all taxes):', '₹ 1,450.00', batchY + 110, true);
  drawBatchRow('Roast Date:', 'Batch Fresh Weekly', batchY + 165);
  drawBatchRow('Best Before:', '6 Months from MFD', batchY + 220);
  drawBatchRow('Net Quantity:', '1000g (1 KG)', batchY + 275, true);

  ctx.restore();

  // Create Three.js CanvasTexture
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates an ultra-crisp CanvasTexture for the Left & Right Gussets (sides of the bag).
 */
export function createGussetTexture(title: string, sub: string, anisotropy = 4): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  // Base background
  ctx.fillStyle = '#1B3D3C';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle vertical shadow down the central V-crease fold (X: 256)
  const creaseGrad = ctx.createLinearGradient(180, 0, 332, 0);
  creaseGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  creaseGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.45)');
  creaseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = creaseGrad;
  ctx.fillRect(180, 0, 152, canvas.height);

  // Top crimp header matching
  ctx.fillStyle = '#132827';
  ctx.fillRect(0, 0, canvas.width, 220);

  ctx.strokeStyle = '#234a49';
  ctx.lineWidth = 3;
  for (let x = 16; x < canvas.width; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, 8);
    ctx.lineTo(x, 210);
    ctx.stroke();
  }

  // Draw Vertical Text (Rotated 90 degrees)
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2 + 100);
  ctx.rotate(Math.PI / 2);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#F9F6EA';
  ctx.font = '800 48px "Outfit", sans-serif';
  ctx.letterSpacing = '12px';
  ctx.fillText(title, 0, -20);

  ctx.fillStyle = '#8FA894';
  ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText(sub, 0, 40);

  ctx.restore();

  // Create Three.js CanvasTexture
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates texture for the top sealed edge.
 */
export function createTopSealTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#112524';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#234b4a';
  ctx.lineWidth = 4;
  for (let x = 10; x < canvas.width; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates texture for the bottom base plate.
 */
export function createBottomTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#152F2E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#1D3F3E';
  ctx.lineWidth = 12;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#8FA894';
  ctx.font = '800 48px "Outfit", sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('THE ROAST ROOM • LUCKNOW', 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates normal/bump map for authentic crimp ridges and subtle tactile foil grain.
 */
export function createBagNormalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Neutral normal map color: rgb(128, 128, 255)
  ctx.fillStyle = '#8080ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top crimp ridges (Y: 0 to 110)
  for (let x = 0; x < canvas.width; x += 10) {
    const grad = ctx.createLinearGradient(x, 0, x + 10, 0);
    grad.addColorStop(0, '#6060ff');
    grad.addColorStop(0.5, '#a0a0ff');
    grad.addColorStop(1, '#6060ff');
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, 10, 110);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
