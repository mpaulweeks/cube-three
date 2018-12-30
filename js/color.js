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
    const colorFreq = 0.2;
    const phaseDelta = 2;
    const colorRange = 127;
    const colorFloor = 128;
    const red = (Math.sin((colorFreq * tick) + (0 * phaseDelta)) * colorRange) + colorFloor;
    const grn = (Math.sin((colorFreq * tick) + (1 * phaseDelta)) * colorRange) + colorFloor;
    const blu = (Math.sin((colorFreq * tick) + (2 * phaseDelta)) * colorRange) + colorFloor;
    return this.fromRGB(red,grn,blu);
  }
}

const Rainbow = new _Rainbow();

// todo
// export default Rainbow;
