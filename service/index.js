app.use(express.static('public'));
const port = process.argv.length > 2 ? process.argv[2] : 4000;