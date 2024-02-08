import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import CommentArea from "../components/CommentArea";

// esercizio 1

describe("Welcome mounting", () => {
  it("correctly mounting welcome's component", () => {
    render(<App />);
    const welcomeText = screen.getByText(/Benvenuti/i);
    expect(welcomeText).toBeInTheDocument();
  });
});

// esercizio2
describe("Rendering", () => {
  it("renders correct number of cards based on JSON data", async () => {
    // Carico il file JSON
    const jsonData = require("../data/fantasy.json");

    render(<App />);

    // Attendo il caricamento asincrono dei dati
    await waitFor(() => {
      // Trovo tutte le carte nel componente
      const cards = screen.getAllByTestId("bootstrap-card");

      // Verifico che il numero di carte renderizzate corrisponda al numero di libri nel JSON
      expect(cards.length).toBe(jsonData.length);
    });
  });
});

// esercizio 3

describe("Comment area mounting", () => {
  it("correctly mounting commentarea's component", () => {
    render(<CommentArea />);
  });
});

// esercizio 4
describe("Book Filtering", () => {
  it("filters books by title", async () => {
    render(<App />);

    // Digita il titolo del libro nel campo di ricerca
    fireEvent.change(screen.getByPlaceholderText("Cerca un libro"), {
      target: { value: "wish" },
    });

    // Attendo che i risultati filtrati siano visualizzati
    await waitFor(() => {
      const filteredBooks = screen.getAllByTestId("bootstrap-card");
      expect(filteredBooks.length).toBeGreaterThan(0);
      // Verifico che siano presenti libri filtrati
    });
  });
});

// esercizio 5
describe("Book Selection", () => {
  test("changes border color when a book is clicked", () => {
    render(<App />);

    const book = screen.getAllByTestId("bootstrap-card");

    // Verifica il colore iniziale del bordo
    const initialBorderColor = book.style.borderColor;

    // Simula il clic sul libro
    fireEvent.click(book);

    // Verifica che il colore del bordo sia cambiato dopo il clic
    const borderColorAfterClick = book.style.borderColor;
    expect(borderColorAfterClick).not.toBe(initialBorderColor);
  });
});
