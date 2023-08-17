import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';
import { fetchData } from './data/response';

jest.mock('./data/response', () => ({
  fetchData: jest.fn(),
}));

jest.mock('./components/FacetFilter/FacetFilter', () => () => <div>FacetFilter</div>);

describe('App component', () => {
  it('renders without crashing', async () => {
    const sampleData = {
      categories: [
        { id: '1', name: 'Category 1', count: 10, parent: '0' },
      ],
    };
    
    (fetchData as jest.Mock).mockResolvedValue(sampleData);

    render(<App />);

    expect(screen.getByText('Otrium Frontend challenge')).toBeInTheDocument();
    expect(screen.getByText('Building a facet filter')).toBeInTheDocument();

    // Use act to wait for useEffect to resolve
    await act(async () => {
      // Empty function to wait for promises to resolve
    });
  });
});
