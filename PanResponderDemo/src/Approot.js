import React from 'react';
import { Image, Easing, Animated, Dimensions } from 'react-native';
import PanResponderComponent from './Components/PanResponderComponent';
import FuildTransitionComponent from './Components/FuildTransitionComponent';
import DummyScreen from './Components/DummyScreen';
import RotationAnimationComponent from './Components/RotationAnimationComponent';
import SeatsScreen from './Components/SeatsScreen';
import GameScreen from './Components/GameComponent/GameScreen';
import CopyJutsuComponent from './Components/CopyJutsu/CopyJutsuComponent';
import { createStackNavigator ,createDrawerNavigator} from 'react-navigation';
const { height, width } = Dimensions.get('window');

const screenTransition = {
	transitionSpec: {
		duration: 1500,
		easing: Easing.out(Easing.poly(4)),
		timing: Animated.timing,
	},
	screenInterpolator: sceneProps => {
		const { layout, position, scene } = sceneProps;
		const { index } = scene;
		let posX=0;
		let posY=0 ;
		posX = (scene && scene.route && scene.route.params && scene.route.params.posX)?scene.route.params.posX:0;
		posY = (scene && scene.route && scene.route.params && scene.route.params.posY)?scene.route.params.posY:0;
		console.log(posX+"   "+posY);
		const translateY = position.interpolate({
			inputRange: [index - 1, index, index + 1],
			outputRange: [height, 0, 0],
		});
		const scaleForFluidX = position.interpolate({
			inputRange: [index - 1, index],
			outputRange: [0, 1],
		});

		const scaleForFluidY = position.interpolate({
			inputRange: [index - 1, index],
			outputRange: [0, 1],
		});

		const translateForFluidX = position.interpolate({
			inputRange: [index - 1, index, index + 1],
			outputRange: [-(width/2)+posX , 0, 0],
		});
		const translateForFluidY = position.interpolate({
			inputRange: [index - 1, index, index + 1],
			outputRange: [height , 0, 0],
		});

		const opacity = position.interpolate({
			inputRange: [index - 1, index - 0.99, index],
			outputRange: [0, 0.5, 1],
		});
		
		const fluidTransition = { opacity, 
									transform: [
										{scaleX: scaleForFluidX},
										{scaleY: scaleForFluidY}, 
										// {translateX: translateForFluidX},  
										{translateY: translateForFluidY}
									] 
								};
		const normalTransition =  { opacity, transform: [{ translateX: translateY }] };

		if ((typeof scene.route.params !== 'undefined') && (typeof scene.route.params.isFluid !== 'undefined') && scene.route.params.isFluid) {
			return fluidTransition;
		}
		return normalTransition;
	},
};

export default createStackNavigator({
	// SeatsScreen: { screen: SeatsScreen, navigationOptions: { header: null } },
	// GameScreen: { screen: GameScreen, navigationOptions: { header: null } },
	// RotationAnimationComponent: { screen: RotationAnimationComponent, navigationOptions: { header: null } },
	PanResponderComponent: { screen: PanResponderComponent, navigationOptions: { header: null } },
	// FuildTransitionComponent: { screen: FuildTransitionComponent, navigationOptions: { header: null } },
	// CopyJutsuComponent: {screen: CopyJutsuComponent, navigationOptions: { header: null } },
	DummyScreen: { screen: DummyScreen, navigationOptions: { header: null } },
}, {
	transitionConfig: () => (screenTransition)
},);	