
function mutate(settings){
  const keys = [
    // 'colorFreq',
    'phaseDelta',
    // 'colorRange',
    // 'colorFloor',
  ];
  const newSettings = {...settings};
  keys.forEach(k => {
    let mutated = settings[k];
    const range = 0.5;
    mutated += range - (Math.random() * range * 2);
    mutated = Math.min(1, mutated);
    mutated = Math.max(-1, mutated);
    newSettings[k] = mutated;
  });
  return newSettings;
}
