import React from "react";
import { render, fireEvent, waitFo, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NavBar from "./src/components/NavBar.jsx";
import CreatePost from "./src/pages/CreatePost.jsx";
import CreateProfile from "./src/pages/CreateProfile.jsx";
import Home from "./src/pages/Home.jsx";

describe("NavBar Component", () => {
  it("renders NavBar component without errors", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
  });
});

describe("CreatePost Component", () => {
  it("renders CreatePost component without errors", () => {
    render(
      <MemoryRouter>
        <CreatePost />
      </MemoryRouter>
    );
  });
});

describe("CreateProfile Component", () => {
  it("renders CreateProfile component without errors", () => {
    render(
      <MemoryRouter>
        <CreateProfile />
      </MemoryRouter>
    );
  });
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{}]),
    ok: true,
  })
);

describe("Home Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders Home component without errors", () => {
    act(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });
  });

  it("fetches records and renders posts", async () => {
    act(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    // Wait for the API request to be resolved
    await act(async () => {
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:3000/posts/");
      });
    });
  });

  it("searches records and updates the UI", async () => {
    act(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });
    act(() => {
      const searchInput = screen.getByPlaceholderText("Search for housing");
      fireEvent.change(searchInput, { target: { value: "house" } });
    });

    act(() => {
      const searchButton = screen.getByTestId("search-button");
      fireEvent.click(searchButton);
    });

    // Wait for the API request to be resolved

    await act(async () => {
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:3000/posts/");
      });
    });
  });
});
