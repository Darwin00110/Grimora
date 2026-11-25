import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './presentation/context/GameContext';
import { HomePage } from './presentation/pages/Home/HomePage';
import { AcademyPage } from './presentation/pages/Academy/AcademyPage';
import { ProgressionPage } from './presentation/pages/Progression/ProgressionPage';
import { ChallengePage } from './presentation/pages/Challenge/ChallengePage';
import { SpellBookPage } from './presentation/pages/SpellBook/SpellBookPage';

import './presentation/styles/global.css';
import './presentation/styles/sprites.css';
import './presentation/styles/components.css';
import './presentation/styles/pixel-characters.css';

/**
 * App — Roteamento e Provider global Grimora
 *
 * Rotas:
 *   /               → Tela inicial (Home)
 *   /academy        → Hub da Academia
 *   /progression    → Mapa de progressão
 *   /challenge/:id  → Fluxo de desafio completo
 *   /spellbook      → Grimório de Magias
 */
function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/progression" element={<ProgressionPage />} />
          <Route path="/challenge/:id" element={<ChallengePage />} />
          <Route path="/spellbook" element={<SpellBookPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
