import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { GameOne, GameTwo, GameThree } from './components/GameFactory';
import LeaderBoard from './components/LeaderBoard';

const RouteSwitch = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/LeaderBoard" element={<LeaderBoard />} />
      <Route path="/GameOne" element={<GameOne />} />
      <Route path="/GameTwo" element={<GameTwo />} />
      <Route path="/GameThree" element={<GameThree />} />
    </Routes>
  </BrowserRouter>
);

export default RouteSwitch;
