import App from '../client/src/components/App.jsx';
// import ReviewsEntry from '../client/src/components/ReviewsEntry.jsx';

describe('<App /> rendering', () => {
  it('should render one <div>', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.type()).toEqual('div');
  });
});
