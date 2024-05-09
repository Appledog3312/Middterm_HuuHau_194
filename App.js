import { MyContextControllerProvider } from './src/Index';
import MyStack from './router/MyStack';
import LoginScreen from './Screens/LoginScreen';

const App = () => {
  return (
    <MyContextControllerProvider>
      <MyStack/>
    </MyContextControllerProvider>
  );
}

export default App;