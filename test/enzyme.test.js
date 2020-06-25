import App from '../client/src/components/App.jsx';
import Scores from '../client/src/components/Scores.jsx';

describe('App component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('should render <div>', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.type()).toEqual('div');
  });
});

describe('Scores component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<Scores />);
  });

  it('should render <tbody>', () => {
    const wrapper = shallow(<Scores />);
    expect(wrapper.type()).toEqual('tbody');
  });
});
