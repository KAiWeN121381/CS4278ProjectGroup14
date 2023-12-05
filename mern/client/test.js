import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CustomLink from "./src/components/CustomLink.jsx";
import "@testing-library/jest-dom/extend-expect"; // for additional matchers

import PostGroup from "./src/components/PostGroup.jsx";
import NavBar from "./src/components/NavBar.jsx";
import CreatePost from "./src/pages/CreatePost.jsx";
import Home from "./src/pages/Home.jsx";
import PostPreview from "./src/components/PostPreview.jsx";
import NoPage from "./src/pages/NoPage.jsx";
import Settings from "./src/pages/Settings.jsx";
import MapComponent from "./src/components/MapComponent.jsx";

describe("NavBar Component", () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), // use the actual implementation
    useNavigate: jest.fn(), // mock the useNavigate function
  }));

  it("renders NavBar component without errors", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByTestId("menu").toBeTruthy);
    const menuButton = screen.getByTestId("menu");
    fireEvent.click(menuButton);

    const cancel = screen.getByTestId("cancel");
    fireEvent.click(cancel);
    // expect(useNavigate).toHaveBeenCalledWith("/");
  });
});

it("renders map component without errors", () => {
  render(
    <MemoryRouter>
      <MapComponent />
    </MemoryRouter>
  );
});

describe("nopage", () => {
  it("renders with no error", () => {
    render(<NoPage></NoPage>);
  });
});

describe("settings", () => {
  it("renders with no error", () => {
    render(<Settings />);
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
        expect(fetch).toHaveBeenCalledWith("http://localhost:5050/posts/");
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
        expect(fetch).toHaveBeenCalledWith("http://localhost:5050/posts/");
      });
    });
  });

  // Mock the useNavigate function
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));

  describe("CreatePost Component", () => {
    it("renders the CreatePost component with form elements", () => {
      render(
        <Router>
          <CreatePost />
        </Router>
      );

      expect(screen.getByText("Create New Post")).toBeTruthy();
      expect(screen.getByLabelText("Name")).toBeTruthy();
      expect(screen.getByLabelText("Title")).toBeTruthy();
      expect(screen.getByLabelText("Price")).toBeTruthy();
      expect(screen.getByLabelText("Start date")).toBeTruthy();
      expect(screen.getByLabelText("End Date")).toBeTruthy();
      expect(screen.getByLabelText("Distance")).toBeTruthy();
      expect(screen.getByLabelText("Address")).toBeTruthy();
      expect(screen.getByLabelText("pet")).toBeTruthy();
      expect(screen.getByLabelText("gym")).toBeTruthy();
      expect(screen.getByLabelText("kitchen")).toBeTruthy();
      expect(screen.getByLabelText("Description")).toBeTruthy();
      expect(screen.getByText("Create post")).toBeTruthy();
    });

    it("handles form submission", () => {
      // Mock the fetch function to return a successful response
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      );

      const navigate = jest.fn();
      // Mock useNavigate to return the navigate function
      require("react-router-dom").useNavigate.mockReturnValue(navigate);

      render(
        <Router>
          <CreatePost />
        </Router>
      );

      // Fill in form fields and submit the form
      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "Test User" },
      });
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "Test Title" },
      });
      fireEvent.change(screen.getByLabelText("Price"), {
        target: { value: "$1000" },
      });

      fireEvent.submit(screen.getByText("Create post"));

      // Assert that the form was submitted
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith("http://localhost:5050/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Test User",
          title: "Test Title",
          file: null,
          price: "$1000",
          start: "",
          end: "",
          distance: "",
          address: "",
          pet: false,
          gym: false,
          kitchen: false,
          description: "",
        }),
      });
    });
  });

  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]), // adjust the response as needed
    })
  );

  // Mock the fetch response
  beforeEach(() => {
    fetch.mockClear();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]), // adjust the response as needed
    });
  });

  test("renders PostGroup component with default state", () => {
    render(<PostGroup />);

    // Check if the initial message is displayed
    expect(screen.getByText("No posts are found")).toBeInTheDocument();
  });

  test("search functionality works", async () => {
    render(<PostGroup />);

    // Type into the search input
    fireEvent.change(screen.getByPlaceholderText("Search for housing"), {
      target: { value: "test" },
    });

    // Click the search button
    fireEvent.click(screen.getByTestId("search-button"));

    // Check if the undo search button is present
    expect(screen.getByText("X")).toBeInTheDocument();

    // Check if the search results are displayed
    await waitFor(() => {
      expect(screen.getByText("No posts are found")).toBeInTheDocument(); // adjust the expectation based on your test data
    });
  });

  test("search functionality works", async () => {
    render(<PostGroup />);

    // Type into the search input
    fireEvent.change(screen.getByPlaceholderText("Search for housing"), {
      target: { value: "" },
    });

    // Click the search button
    fireEvent.click(screen.getByTestId("search-button"));

    // Check if the search results are displayed
    await waitFor(() => {
      expect(screen.getByText("No posts are found")).toBeInTheDocument(); // adjust the expectation based on your test data
    });
  });

  test("applies filters for records", async () => {
    fetch.mockClear();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          username: "Test User",
          title: "Test Title",
          file: null,
          price: 300,
          start: "2018-01-01",
          end: "2018-01-02",
          distance: "",
          address: "",
          pet: false,
          gym: false,
          kitchen: false,
          description: "",
        }),
    });

    render(<PostGroup />);

    screen.debug();

    // Open the filter pop-up
    fireEvent.click(screen.getByTestId("Filter"));

    // Set filter values (adjust as per your UI)
    const maxPriceInput = screen.getByTestId("Maximum_price");
    fireEvent.change(maxPriceInput, { target: { value: 500 } });
    const minPriceInput = screen.getByTestId("Minimum_price");
    fireEvent.change(minPriceInput, { target: { value: 200 } });
    const maxdate = screen.getByTestId("Maximum_date");
    fireEvent.change(maxdate, { target: { value: "2020-01-01" } });
    const mindate = screen.getByTestId("Minimum_date");
    fireEvent.change(mindate, { target: { value: "2000-01-01" } });

    // Apply filters
    fireEvent.click(screen.getByTestId("apply"));

    // Assert that the component is displaying filtered results
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("applies filters for records", async () => {
    fetch.mockClear();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          username: "Test User",
          title: "Test Title",
          file: null,
          price: 300,
          start: "2018-01-01",
          end: "2018-01-02",
          distance: "",
          address: "",
          pet: false,
          gym: false,
          kitchen: false,
          description: "",
        }),
    });

    render(<PostGroup />);

    screen.debug();

    // Open the filter pop-up
    fireEvent.click(screen.getByTestId("Filter"));

    // Set filter values (adjust as per your UI)
    const maxPriceInput = screen.getByTestId("Maximum_price");
    fireEvent.change(maxPriceInput, { target: { value: 210 } });
    const minPriceInput = screen.getByTestId("Minimum_price");
    fireEvent.change(minPriceInput, { target: { value: 500 } });
    const maxdate = screen.getByTestId("Maximum_date");
    fireEvent.change(maxdate, { target: { value: "2000-01-01" } });
    const mindate = screen.getByTestId("Minimum_date");
    fireEvent.change(mindate, { target: { value: "2020-01-01" } });

    // Apply filters
    fireEvent.click(screen.getByTestId("apply"));

    // Assert that the component is displaying filtered results
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("applies filters for records", async () => {
    fetch.mockClear();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          username: "Test User",
          title: "Test Title",
          file: null,
          price: 300,
          start: "2018-01-01",
          end: "2018-01-02",
          distance: "",
          address: "",
          pet: false,
          gym: false,
          kitchen: false,
          description: "",
        }),
    });
    render(<PostGroup />);
    screen.debug();

    // Open the filter pop-up
    fireEvent.click(screen.getByTestId("Filter"));

    // Set filter values (adjust as per your UI)
    const maxPriceInput = screen.getByTestId("Maximum_price");
    fireEvent.change(maxPriceInput, { target: { value: "" } });
    const minPriceInput = screen.getByTestId("Minimum_price");
    fireEvent.change(minPriceInput, { target: { value: "" } });
    const maxdate = screen.getByTestId("Maximum_date");
    fireEvent.change(maxdate, { target: { value: "" } });
    const mindate = screen.getByTestId("Minimum_date");
    fireEvent.change(mindate, { target: { value: "" } });

    // Apply filters
    fireEvent.click(screen.getByTestId("apply"));

    // Assert that the component is displaying filtered results
    expect(screen.getByText("No posts are found")).toBeInTheDocument();
  });

  test("it handles error when fetching records", async () => {
    // Mock the fetch function to simulate a failed response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found", // Simulate a 404 error, adjust as needed
    });

    render(<PostGroup />); // Render your component

    const alertSpy = jest.spyOn(global, "alert");

    // Wait for the error handling to take place (you might need to adjust the selector)
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("An error occurred: Not Found");
    });
    alertSpy.mockRestore();
  });

  test("applies filters for records", async () => {
    render(<PostGroup />);

    // Open the filter pop-up
    fireEvent.click(screen.getByTestId("Filter"));

    // Set filter values (adjust as per your UI)
    const maxdate = screen.getByTestId("Maximum_date");
    fireEvent.change(maxdate, { target: { value: new Date("2023-12-01") } });

    // Apply filters
    fireEvent.click(screen.getByText("Apply"));

    // Assert that the component is displaying filtered results
    expect(screen.getByText("No posts are found")).toBeInTheDocument();
  });

  test("renders PostPreview component with post data", () => {
    const post = {
      title: "Test Post",
    };

    render(
      <MemoryRouter>
        <PostPreview post={post} />
      </MemoryRouter>
    );

    // Check if the post title is rendered
    expect(screen.getByText("Test Post")).toBeTruthy();
  });

  // Mock the react-router useNavigate hook
  jest.mock("react-router", () => ({
    useNavigate: () => jest.fn(),
  }));

  describe("CreatePost", () => {
    test("submitting the form", async () => {
      await act(async () => {
        render(
          <Router>
            <CreatePost />
          </Router>
        );

        // Mock global.USERID
        global.USERID = "someUserID";

        // Mock fetch for posts
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue([]),
        });

        // Mock fetch for user
        global.fetch.mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue({
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
          }),
        });

        // Input values
        fireEvent.change(screen.getByTestId("Name-input"), {
          target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByTestId("Title-input"), {
          target: { value: "Test Tile" },
        });
        fireEvent.change(screen.getByTestId("dist-input"), {
          target: { value: 1 },
        });
        fireEvent.change(screen.getByTestId("gym-input"), {
          target: { value: true },
        });

        // Add more fireEvent.change calls for other input fields

        // Submission
        fireEvent.click(screen.getByText("Create post"));
      });
    });
  });

  test("it handles error", async () => {
    fetch.mockClear();
    // Mock the fetch function to simulate a failed response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found", // Simulate a 404 error, adjust as needed
    });

    render(
      <Router>
        <CreatePost />
      </Router>
    ); // Render your component
    // Simulate user interaction that triggers the fetch
    fireEvent.click(screen.getByTestId("submit")); // Adjust the selector based on your component

    const alertSpy = jest.spyOn(global, "alert");

    // Wait for the error handling to take place (you might need to adjust the selector)
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("An error occurred: Not Found");
    });
    alertSpy.mockRestore();
  });

  // Mock the react-router module
  jest.mock("react-router");

  test("it navigates to /createprofile when USERID is empty", () => {
    global.USERID = ""; // Assuming USERID is a global variable
    const navigateMock = jest.fn();

    // Use jest.spyOn to mock the useNavigate function
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);
    render(
      <Router>
        <CreatePost />
      </Router>
    ); // Render your component

    // Check if the navigateMock is called with the expected argument
    expect(navigateMock).toHaveBeenCalledWith("/createprofile");
  });

  // Mock window.alert
  const alertMock = jest.spyOn(window, "alert");

  // // Your test
  // test("it handles submission with successful response", async () => {
  //   // Mock a successful fetch response
  //   global.fetch.mockResolvedValueOnce({
  //     ok: true,
  //   });

  //   jest.mock("react-router-dom", () => ({
  //     ...jest.requireActual("react-router-dom"),
  //     useNavigate: () => jest.fn(),
  //   }));

  //   render(
  //     <MemoryRouter>
  //       <CreatePost />
  //     </MemoryRouter>
  //   ); // Render your component

  //   // Perform actions that trigger the onSubmit function
  //   await act(async () => {
  //     fireEvent.click(screen.getByTestId("submit")); // Adjust the selector based on your component
  //   });

  //   // Wait for the asynchronous tasks to complete
  //   await waitFor(() => {
  //     // Assert that fetch was called with the correct arguments
  //     expect(global.fetch).toHaveBeenCalledWith("http://localhost:5050/posts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(/* expected payload */),
  //     });

  //     // Assert that alert was not called
  //     expect(alertMock).not.toHaveBeenCalled();

  //     // Assert that useNavigate was called with the expected argument
  //     expect(useNavigate).toHaveBeenCalledWith("/");
  //   });
  // });
});
