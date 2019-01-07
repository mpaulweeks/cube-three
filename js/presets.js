
class BlockSpawner {
  constructor(coord, rotationOffset, tickOffset){
    this.coord = coord;
    this.rotationOffset = rotationOffset;
    this.tickOffset = tickOffset;
  }
  spawn() {
    Block.spawnAt(
      this.coord,
      this.rotationOffset,
      this.tickOffset
    );
  }
}

class Preset {
  constructor(name, settings, blockSpawners){
    this.name = name;
    this.settings = settings;
    this.spawners = blockSpawners;
  }
  load() {
    SCENE.removeAll();
    Object.keys(this.settings).forEach(key => {
      CubeSettings.setAttr(key, this.settings[key]);
    });
    this.spawners.forEach(bs => bs.spawn());
  }
}

function range(n) {
  const out = [];
  for (let i = 0; i < n; i++){
    out.push(i);
  }
  return out;
}

const yRange = 10;
const xRange = 2 * yRange;

const PRESETS = [
  {
    name: 'rainbow rows',
    settings: {
      sizeX: 1.0,
      sizeY: 1.0,
      sizeZ: 1.0,
    },
    spawners: range(yRange).map((y, yi, yArr) => {
      return range(xRange * 2).map((x, xi, xArr) => {
        const xCoord = (x - xArr.length/2);
        const yCoord = (y - yArr.length/2);
        const offset = (y * xArr.length) + x;
        return new BlockSpawner(
          {
            x: xCoord,
            y: yCoord,
          },
          offset,
          offset,
        );
      });
    }).flat(),
  },
  {
    name: 'overlapping cubes',
    settings: {
      sizeX: 1.0,
      sizeY: 1.0,
      sizeZ: 1.0,
    },
    spawners: range(yRange).map((y, yi, yArr) => {
      return range(xRange).map((x, xi, xArr) => {
        const xCoord = (x - xArr.length/2) / 2;
        const yCoord = (y - yArr.length/2) / 2 + (x / xArr.length);
        const offset = (y * xArr.length) + x;
        return new BlockSpawner(
          {
            x: xCoord,
            y: yCoord,
          },
          offset,
          offset,
        );
      });
    }).flat(),
  },
  {
    name: 'tiny cubes',
    settings: {
      sizeX: 0.3,
      sizeY: 0.3,
      sizeZ: 0.3,
    },
    spawners: range(yRange * 2).map((y, yi, yArr) => {
      return range(xRange * 2).map((x, xi, xArr) => {
        const xCoord = (x - xArr.length/2) / 3;
        const yCoord = (y - yArr.length/2) / 3;
        const offset = (y * xArr.length) + x;
        return new BlockSpawner(
          {
            x: xCoord,
            y: yCoord,
          },
          0,
          offset,
        );
      });
    }).flat(),
  },
  {
    name: 'dominos',
    settings: {
      sizeX: 0.5,
      sizeY: 0.5,
      sizeZ: 0.1,
    },
    spawners: range(yRange).map((y, yi, yArr) => {
      return range(xRange * 2).map((x, xi, xArr) => {
        const xCoord = (x - xArr.length/2) / 3;
        const yCoord = (y - yArr.length/2);
        const offset = (y * xArr.length) + x;
        return new BlockSpawner(
          {
            x: xCoord,
            y: yCoord,
          },
          offset,
          0,
        );
      });
    }).flat(),
  },
  {
    name: 'pick-up sticks',
    settings: {
      sizeX: 2.0,
      sizeY: 0.1,
      sizeZ: 0.1,
    },
    spawners: range(yRange * 2).map((y, yi, yArr) => {
      return range(xRange * 2).map((x, xi, xArr) => {
        const xCoord = (x - xArr.length/2) / 3;
        const yCoord = (y - yArr.length/2) / 3;
        const offset = (y * xArr.length) + x;
        return new BlockSpawner(
          {
            x: xCoord,
            y: yCoord,
          },
          offset * (offset - 1),
          offset,
        );
      });
    }).flat(),
  },
  {
    name: 'empty / reset',
    settings: {
      sizeX: 1.0,
      sizeY: 1.0,
      sizeZ: 1.0,
    },
    spawners: [],
  },
].map(ps => new Preset(ps.name, ps.settings || {}, ps.spawners));

// create buttons
PRESETS.forEach((p, i) => {
  document.getElementById('presets').innerHTML += `
    <div class="row">
      <button id="preset-${i}">${p.name}</button>
    </div>
  `;
});

// create listeners
PRESETS.forEach((p, i) => {
  document.getElementById(`preset-${i}`).addEventListener('click', () => {
    PRESETS[i].load();
  });
});
