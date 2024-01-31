import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TestDopplerIntlProvider } from "../../i18n/TestDopplerIntlProvider";
import { Promotional } from "./Promotional";

describe("Promotional component", () => {
  const texts = {
    title: "a title",
    description: "some description",
    actionText: "PLUS PLans",
  };

  const urls = {
    actionUrl: "/path/to/plus/plans",
    logoUrl: "icon.svg",
    previewUrl: "image.jpg",
  };

  const optionals = {
    features: ["feature 1", "feature 2"],
    paragraph: "an strong text",
    caption: "preview image",
  };

  it("should render component", () => {
    // Assert
    const { features, ...rest } = optionals;

    // Act
    render(
      <TestDopplerIntlProvider>
        <Promotional {...texts} {...urls} {...optionals} />
      </TestDopplerIntlProvider>,
    );

    // Assert
    Object.values(texts)
      .concat(Object.values(rest))
      .map((text) => expect(screen.getByText(text)).toBeInTheDocument());
    expect(screen.getByRole("link")).toHaveAttribute("href", urls.actionUrl);
    expect(screen.getByRole("img", { name: "icon" })).toHaveAttribute(
      "src",
      expect.stringContaining(urls.logoUrl),
    );
    expect(screen.getByRole("img", { name: texts.title })).toHaveAttribute(
      "src",
      expect.stringContaining(urls.previewUrl),
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(features.length);
  });

  it("should render component without features", () => {
    // Assert
    const { features, ...rest } = optionals;

    // Act
    render(
      <TestDopplerIntlProvider>
        <Promotional {...texts} {...urls} {...rest} />
      </TestDopplerIntlProvider>,
    );

    // Assert
    Object.values(texts)
      .concat(Object.values(rest))
      .map((text) => expect(screen.getByText(text)).toBeInTheDocument());
    expect(screen.getByRole("link")).toHaveAttribute("href", urls.actionUrl);
    expect(screen.getByRole("img", { name: "icon" })).toHaveAttribute(
      "src",
      expect.stringContaining(urls.logoUrl),
    );
    expect(screen.getByRole("img", { name: texts.title })).toHaveAttribute(
      "src",
      expect.stringContaining(urls.previewUrl),
    );
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should render component without paragraph", () => {
    // Assert
    const { paragraph, ...rest } = optionals;

    // Act
    render(
      <TestDopplerIntlProvider>
        <Promotional {...texts} {...urls} {...rest} />
      </TestDopplerIntlProvider>,
    );

    // Assert
    Object.values(texts).map((text) =>
      expect(screen.getByText(text)).toBeInTheDocument(),
    );
    expect(screen.getByText(optionals.caption)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", urls.actionUrl);
    expect(screen.getByRole("img", { name: "icon" })).toHaveAttribute(
      "src",
      expect.stringContaining(urls.logoUrl),
    );
    expect(screen.getByRole("img", { name: texts.title })).toHaveAttribute(
      "src",
      expect.stringContaining(urls.previewUrl),
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(
      optionals.features.length,
    );
    expect(screen.queryByText(paragraph)).not.toBeInTheDocument();
  });

  it("should render component without caption", () => {
    // Assert
    const { caption, ...rest } = optionals;

    // Act
    render(
      <TestDopplerIntlProvider>
        <Promotional {...texts} {...urls} {...rest} />
      </TestDopplerIntlProvider>,
    );

    // Assert
    Object.values(texts).map((text) =>
      expect(screen.getByText(text)).toBeInTheDocument(),
    );
    expect(screen.getByText(optionals.paragraph)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", urls.actionUrl);
    expect(screen.getByRole("img", { name: "icon" })).toHaveAttribute(
      "src",
      expect.stringContaining(urls.logoUrl),
    );
    expect(screen.getByRole("img", { name: texts.title })).toHaveAttribute(
      "src",
      expect.stringContaining(urls.previewUrl),
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(
      optionals.features.length,
    );
    expect(screen.queryByText(caption)).not.toBeInTheDocument();
  });
});
