import {CommonActions, StackActions} from '@react-navigation/native';

let navigation;

function setTopLevelNavigator(navigatorRef) {
  navigation = navigatorRef;
}

function navigate(name, params) {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
}

const navigateToClearStack = state => {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: state}],
      }),
    );
  }
};

const navigateToClearStackDetail = (name, params) => {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.reset({
        index: 2,
        routes: [
          {name: 'Dashboard'},
          {name: 'Home'},
          {
            name: name,
            params,
          },
        ],
      }),
    );
  }
};

const popFromStack = count => {
  const popAction = StackActions.pop(count);
  if (navigation) {
    navigation?.dispatch(popAction);
  }
};

const pushToStack = (name, params) => {
  if (navigation) {
    navigation?.dispatch(StackActions.push(name, params));
  }
};

function goBack() {
  if (navigation) {
    navigation?.dispatch(CommonActions.goBack());
  }
}

export default {
  navigate,
  setTopLevelNavigator,
  navigateToClearStack,
  goBack,
  popFromStack,
  pushToStack,
  navigateToClearStackDetail,
};
