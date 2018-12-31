class _Rainbow {
  // https://krazydad.com/tutorials/makecolors.php
  fromRGB(r,g,b){
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255,
    };
  }
  getColor(tick, cubeSettings){
    const colorFreq = 0.2 + (0.199999 * cubeSettings.colorFreq);
    const phaseDelta = 2 + Math.floor(1.99999 * cubeSettings.phaseDelta);
    const colorRange = 127 - 64 + (63.5 * cubeSettings.colorRange);
    const colorFloor = 128 - 64 + (63.5 * cubeSettings.colorFloor);
    const red = (Math.sin((colorFreq * tick) + (0 * phaseDelta)) * colorRange) + colorFloor;
    const grn = (Math.sin((colorFreq * tick) + (1 * phaseDelta)) * colorRange) + colorFloor;
    const blu = (Math.sin((colorFreq * tick) + (2 * phaseDelta)) * colorRange) + colorFloor;
    return this.fromRGB(red,grn,blu);
  }
}

const Rainbow = new _Rainbow();

// todo
// export default Rainbow;
