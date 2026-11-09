import React from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AdventureMapArtwork } from '../components/AdventureMapArtwork';

const adventures = [
  {
    id: 'mosslight-crossing',
    title: 'Mosslight Crossing',
    subtitle: 'A trail swallowed by the fen',
    description: 'Follow a chain of ghostly lanterns through the marsh before the old causeway disappears beneath the rising water.',
    players: '2–4 players',
    hours: 2,
    layout: 'fen',
  },
  {
    id: 'bell-beneath',
    title: 'The Bell Beneath',
    subtitle: 'Something stirs under stone',
    description: 'Descend into a flooded cavern and discover who—or what—is ringing a bell no living hand can reach.',
    players: '1–3 players',
    hours: 3,
    layout: 'cavern',
  },
  {
    id: 'emberwatch-keep',
    title: 'Emberwatch Keep',
    subtitle: 'A fortress with a fading flame',
    description: 'Climb the mountain road to a forgotten stronghold where a single watchfire is keeping the night at bay.',
    players: '3–6 players',
    hours: 4,
    layout: 'keep',
  },
  {
    id: 'clockwork-orchard',
    title: 'The Clockwork Orchard',
    subtitle: 'Harvest before the final chime',
    description: 'Explore a peculiar orchard of brass and blossom, and find the missing key before the trees wind down.',
    players: '1–5 players',
    hours: 1,
    layout: 'orchard',
  },
] as const;

export function HostGamePage() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [previewNotice, setPreviewNotice] = React.useState('');
  const selectedAdventure = adventures.find((adventure) => adventure.id === selectedId);

  const selectAdventure = (id: string) => {
    setSelectedId(id);
    setPreviewNotice('');
  };

  return (
    <main className="adventure-host-page">
      <div className="adventure-host-page__glow" aria-hidden="true" />
      <header className="adventure-header adventure-host-header">
        <Link className="adventure-brand" to="/" aria-label="The Couch Quest home">
          <span className="adventure-brand__mark"><MenuBookOutlinedIcon /></span>
          <span className="adventure-brand__name">THE COUCH QUEST</span>
        </Link>
        <Link className="adventure-records" to="/">
          <ArrowBackRoundedIcon fontSize="small" />
          <span>Back to home</span>
        </Link>
      </header>

      <section className="adventure-host-content" aria-labelledby="host-game-title">
        <div className="adventure-host-intro">
          <p className="adventure-eyebrow"><span /> THE ADVENTURE BEGINS</p>
          <h1 id="host-game-title">Choose your <em>adventure</em></h1>
          <p>Pick a one-shot for your party. Every tale has a beginning, an ending, and a place around the table.</p>
        </div>

        <div className="adventure-host-grid" aria-label="Available adventures">
          {adventures.map((adventure) => {
            const selected = selectedId === adventure.id;
            return (
              <button
                className={`adventure-card${selected ? ' adventure-card--selected' : ''}`}
                type="button"
                key={adventure.id}
                aria-pressed={selected}
                onClick={() => selectAdventure(adventure.id)}
              >
                <span className="adventure-card__art">
                  <AdventureMapArtwork layout={adventure.layout} title={adventure.title} />
                  <span className="adventure-card__duration">
                    <AccessTimeRoundedIcon fontSize="small" />
                    {adventure.hours} {adventure.hours === 1 ? 'hour' : 'hours'}
                  </span>
                  {selected && <span className="adventure-card__chosen">Selected</span>}
                </span>
                <span className="adventure-card__body">
                  <span className="adventure-card__subtitle">{adventure.subtitle}</span>
                  <span className="adventure-card__title">{adventure.title}</span>
                  <span className="adventure-card__description">{adventure.description}</span>
                  <span className="adventure-card__players">
                    <GroupsRoundedIcon fontSize="small" />
                    {adventure.players}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="adventure-host-selection" aria-live="polite">
          {selectedAdventure ? (
            <>
              <p>
                <strong>{selectedAdventure.title}</strong> is ready for {selectedAdventure.players.toLowerCase()}.
                Game setup will be connected later.
              </p>
              <Button
                className="adventure-button adventure-button--primary adventure-host-continue"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => setPreviewNotice(
                  `Preview only: ${selectedAdventure.title} is selected. Game setup will be connected later.`,
                )}
              >
                Preview setup
              </Button>
            </>
          ) : (
            <p>Choose an adventure to see your next step.</p>
          )}
          {previewNotice && <p className="adventure-host-notice" role="status">{previewNotice}</p>}
        </div>
      </section>

      <footer className="adventure-footer adventure-host-footer">
        <span>ROLL FOR INITIATIVE <span className="adventure-footer__separator">✦</span> STAY FOR THE STORY</span>
        <span>BUILT FOR THE WHOLE PARTY</span>
      </footer>
    </main>
  );
}
