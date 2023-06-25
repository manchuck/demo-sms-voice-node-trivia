import Airtable from 'airtable';
import debug from 'debug';

const log = debug('@vonage.game.airtable');

const AT_BASE_ID = process.env.AT_BASE_ID;
const AT_TABLE_ID = process.env.AT_TABLE_ID;
const AT_FIELDS = {
  NAME: 'Name',
  PHONE: 'Phone',
};

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_TOKEN,
});

const getTable = async () => {
  log('Getting airtable table');
  const table = airtable
    .base(AT_BASE_ID)
    .table(AT_TABLE_ID);
  log('Done with airtable table call');
  log(`Table: ${table?.id}`, table);
  return table;
};

export const getAirtableSignups = async (game) => {
  log('Finding particapants');
  const table = await getTable();
  log(`Airtable`, table);
  const records = await table.select({
    fields: Object.values(AT_FIELDS),
  }).all();

  log('Records fetched');
  game.particapants = [];
  for (const { fields } of Object.values(records)) {
    console.log(fields);
    game.particapants.push({
      name: fields.Name,
      phone: fields.Phone,
      last_status: 'unknown',
    });
  }

  if (!game.player) {
    log('setting player');
    game.player = game.particapants.sort(() => 0.5 - Math.random())[0];
  }

  // remove the player
  game.particapants = game.particapants.filter(
    ({ phone }) => phone !== game.player.phone,
  );

  log('Particapants', game.particapants);
  log(`Player`, game.player);

  return game;
};
