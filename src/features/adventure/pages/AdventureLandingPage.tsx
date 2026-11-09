import React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';
import { AdventureScene } from '../components/AdventureScene';
import { useRainAmbience } from '../hooks/useRainAmbience';

type GameAction = 'join' | null;

export function AdventureLandingPage() {
  const [action, setAction] = React.useState<GameAction>(null);
  const [joinCode, setJoinCode] = React.useState('');
  const [notice, setNotice] = React.useState('');
  const { enabled: rainSoundEnabled, error: rainSoundError, toggle: toggleRainSound } = useRainAmbience();

  const openAction = (nextAction: Exclude<GameAction, null>) => {
    setNotice('');
    setAction(nextAction);
  };
  const closeAction = () => {
    setNotice('');
    setAction(null);
  };

  return (
    <main className="adventure-page">
      <AdventureScene />
      <div className="adventure-grain" aria-hidden="true" />
      <header className="adventure-header">
        <Link className="adventure-brand" to="/" aria-label="The Couch Quest home">
          <span className="adventure-brand__mark"><MenuBookOutlinedIcon /></span>
          <span className="adventure-brand__name">THE COUCH QUEST</span>
        </Link>
        <div className="adventure-header__controls">
          <button
            className="adventure-sound-toggle"
            type="button"
            aria-label={rainSoundEnabled ? 'Turn rain sounds off' : 'Turn rain sounds on'}
            aria-pressed={rainSoundEnabled}
            onClick={() => void toggleRainSound()}
          >
            {rainSoundEnabled
              ? <VolumeUpRoundedIcon fontSize="small" />
              : <VolumeOffRoundedIcon fontSize="small" />}
            <span>{rainSoundEnabled ? 'Sound on' : 'Sound off'}</span>
          </button>
          <Link className="adventure-records" to="/records">
            <span>Records</span>
            <ArrowForwardRoundedIcon fontSize="small" />
          </Link>
          {rainSoundError && (
            <span className="adventure-sound-error" role="status">{rainSoundError}</span>
          )}
        </div>
      </header>

      <section className="adventure-hero" aria-labelledby="adventure-title">
        <div className="adventure-copy">
          <p className="adventure-eyebrow"><span /> YOUR NEXT GREAT STORY STARTS HERE</p>
          <h1 id="adventure-title">The Couch<br /><em>Quest</em></h1>
          <p className="adventure-description">
            Gather your party. Choose your path.<br className="adventure-desktop-break" />
            Make a legend of your living room.
          </p>
          <div className="adventure-actions">
            <Button
              component={Link}
              to="/host"
              className="adventure-button adventure-button--primary"
              onClick={(event) => event.currentTarget.blur()}
              startIcon={<AutoAwesomeRoundedIcon />}
              endIcon={<ArrowForwardRoundedIcon />}
            >
              Host a game
            </Button>
            <Button
              className="adventure-button adventure-button--secondary"
              onClick={(event) => {
                event.currentTarget.blur();
                openAction('join');
              }}
              startIcon={<SportsEsportsOutlinedIcon />}
            >
              Join a game
            </Button>
          </div>
          <p className="adventure-note">One screen to tell the tale. Every phone at the table.</p>
        </div>
      </section>

      <footer className="adventure-footer">
        <span>ROLL FOR INITIATIVE <span className="adventure-footer__separator">✦</span> STAY FOR THE STORY</span>
        <span>BUILT FOR THE WHOLE PARTY</span>
      </footer>

      <Dialog
        open={action !== null}
        onClose={closeAction}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: 'adventure-dialog' }}
      >
        <IconButton
          className="adventure-dialog__close"
          aria-label="Close"
          onClick={closeAction}
        >
          <CloseRoundedIcon />
        </IconButton>
        <DialogTitle className="adventure-dialog__title">
          Join the adventure
        </DialogTitle>
        <DialogContent className="adventure-dialog__content">
          <Typography className="adventure-dialog__intro">
            Enter the invite code from your host. Joining games will be available when the game service is connected.
          </Typography>
          <TextField
            fullWidth
            label="Game invite code"
            value={joinCode}
            onChange={(event) => setJoinCode(event.target.value)}
            placeholder="e.g. DRAGON7"
            autoComplete="off"
            inputProps={{ maxLength: 12, 'aria-label': 'Game invite code' }}
          />
          <Button
            className="adventure-dialog__submit"
            fullWidth
            disabled={!joinCode.trim()}
            onClick={() => setNotice('Preview only: joining games will be connected later.')}
          >
            Preview join
          </Button>
          {notice && (
            <Typography className="adventure-dialog__intro" role="status" aria-live="polite">
              {notice}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
