import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'

if (__DEV__) {
	Reactotron
		.configure({name: 'Lyon', host: '192.168.0.7'})
		.use(trackGlobalErrors())
		.connect();

	console.tron = Reactotron
}