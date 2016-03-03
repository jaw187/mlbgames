# mlbgames
Retrieve MLB games for a given day

## Install
```
npm install mlbgames
```

## Usage
```
const Mlbgames = require('mlbgames');
const options = {
  path: 'year_2011/month_07/day_23/'
};

const mlb = new Mlb(options);
mlb.get((err, games) => {

  //... do something
});
```
