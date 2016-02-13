// Load modules

const Code = require('code');
const Lab = require('lab');

const Mlb = require('../lib/mlb');

// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Games', () => {

    it('Can get games', (done) => {

        const options = {
            path: 'year_2011/month_07/day_23/'
        };

        const mlb = new Mlb(options);

        mlb.get((err, games) => {

            expect(err).to.not.exist();
            expect(games).to.exist();
            expect(games.length).to.exist();

            done();
        });
    });

    it('requires a path', (done) => {

        const mlb = new Mlb();

        mlb.get((err, games) => {

            expect(err).to.exist();

            done();
        });
    });
});
