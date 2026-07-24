import PageLayout from './components/layout/PageLayout.jsx';
import WizardShell from './components/wizard/WizardShell.jsx';
import { useAutosave } from './hooks/useAutosave.js';
import { useBeforeUnload } from './hooks/useBeforeUnload.js';

export default function App() {
  useAutosave();
  useBeforeUnload();

  return (
    <PageLayout>
      <WizardShell />
    </PageLayout>
  );
}
