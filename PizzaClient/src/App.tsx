import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Pizza } from "./components/Pizza";

export function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Pizza />
    </FluentProvider>
  );
}
