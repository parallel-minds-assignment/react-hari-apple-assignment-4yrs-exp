import './styles/App.scss';
import { SearchInput } from './features/search/SearchInput.js';

const App = () => {
  return (
    <div className="App">
      <h1 className='apple-gradient-text'>Search Movies</h1>
      <SearchInput />
    </div>
  );
}

export default App;
