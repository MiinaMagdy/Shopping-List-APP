import Env from './utils/env';
import server from './app';

const PORT = Env.getEnvValue('PORT', 3000);

server.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
