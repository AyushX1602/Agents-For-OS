import React, { useEffect, useState } from 'react'
import Desktop from './desktop/Desktop'
import BootScreen from './desktop/BootScreen'
import LockScreen from './desktop/LockScreen'
import VoiceController from './input/VoiceController'
import GestureController from './input/GestureController'
import SignLanguageController from './input/SignLanguageController'
import FaceRecognition from './input/FaceRecognition'
import EyeTracker from './input/EyeTracker'
import VisualAlert from './components/VisualAlert'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastContainer } from './components/Toast'
import Spotlight from './components/Spotlight'
import NotificationCenter from './components/NotificationCenter'
import SOSButton from './desktop/SOSButton'
import HelpButton from './desktop/HelpButton'
import useOsStore from './store/osStore'
import useWindowStore from './store/windowStore'
import useAlzheimerSupport from './hooks/useAlzheimerSupport'
import useAccessibility from './hooks/useAccessibility'
import useReminderScheduler from './hooks/useReminderScheduler'
import { getDefaultSize } from './config/appConfig'
import { subscribeConnectivity } from './lib/connectivity'
import axios from 'axios'

/**
 * SpiritOSApp — the full Spirit OS desktop experience.
 * Rendered at route /app via React Router in App.jsx.
 */
function SpiritOSApp() {
  // Apply theme and accessibility settings
  useAccessibility()
  // Run the reminder scheduler at app level so reminders fire even when the
  // Reminders window is closed.
  useReminderScheduler()

  // Phase 3.5 — Subscribe to online/offline events and sync to osStore
  useEffect(() => {
    const unsubscribe = subscribeConnectivity()
    return unsubscribe
  }, [])

  const {
    gestureEnabled, voiceEnabled, signLanguageEnabled, eyeTrackingEnabled,
    alzheimerPhase = 0,
    firstLaunchDone, markFirstLaunchDone,
    isOffline, voiceEnabled: voiceOn,
    toggleSpotlight, dndEnabled,
    addNotification,
    locked, lockScreen, unlockScreen, lockOnStartup
  } = useOsStore()
  const openWindow = useWindowStore((s) => s.openWindow)
  const [booted, setBooted] = useState(false)

  // ── Global Ctrl/Cmd+K → Spotlight ───────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        toggleSpotlight()
      }
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault()
        lockScreen()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggleSpotlight, lockScreen])

  // Phase 2.5 — Alzheimer support hook (reminders, face scan trigger, unknown prompt)
  useAlzheimerSupport(alzheimerPhase)

  // First-launch onboarding: open the Welcome deck once after boot completes.
  useEffect(() => {
    if (!booted || firstLaunchDone) return
    const timer = setTimeout(async () => {
      try {
        const r = await axios.get('/api/presentations')
        const welcome = (r.data || []).find((d) => d.isBuiltin && /welcome/i.test(d.title))
        if (welcome) {
          openWindow('Presentation', 'Welcome tour',
            getDefaultSize('Presentation'),
            { initialDeckId: welcome.id })
        }
      } catch (_) {
        // Presentations API down — fall back to opening the library
        openWindow('Presentation', 'Presentations', getDefaultSize('Presentation'))
      }
      markFirstLaunchDone()
    }, 1200)
    return () => clearTimeout(timer)
  }, [booted, firstLaunchDone, markFirstLaunchDone, openWindow])

  return (
    <div className="w-screen h-screen overflow-hidden bg-os-bg-primary">
      {/* Startup boot screen — plays Spirit_Awake.mp3 on every load */}
      {!booted && <BootScreen onDone={() => { setBooted(true); if (lockOnStartup) lockScreen() }} />}
      <Desktop />
      {/* Voice controller — real speech recognition with 30+ commands */}
      {voiceEnabled && (
        <ErrorBoundary label="Voice Controller" compact
          onError={(_e, _i, label) => addNotification(`⚠️ ${label} failed — voice disabled`, 'warn')}>
          <VoiceController />
        </ErrorBoundary>
      )}
      {/* Gesture/camera only activates when user clicks the toggle button */}
      {gestureEnabled && (
        <ErrorBoundary label="Gesture Controller" compact
          onError={(_e, _i, label) => addNotification(`⚠️ ${label} failed — gestures disabled`, 'warn')}>
          <GestureController />
        </ErrorBoundary>
      )}
      {/* Sign language overlay — Phase 1.1.5 */}
      {signLanguageEnabled && (
        <ErrorBoundary label="Sign Language" compact
          onError={(_e, _i, label) => addNotification(`⚠️ ${label} failed`, 'warn')}>
          <SignLanguageController />
        </ErrorBoundary>
      )}
      {/* Eye tracking cursor control — Phase 1.2 */}
      {eyeTrackingEnabled && (
        <ErrorBoundary label="Eye Tracker" compact
          onError={(_e, _i, label) => addNotification(`⚠️ ${label} failed — eye tracking disabled`, 'warn')}>
          <EyeTracker />
        </ErrorBoundary>
      )}
      {/* Face recognition — Phase 2.4/2.5: active when Alzheimer phase >= 3 */}
      {alzheimerPhase >= 3 && (
        <div style={{
          position: 'fixed', bottom: 16, right: 16,
          zIndex: 9990, borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 4px 32px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <ErrorBoundary label="Face Recognition" compact
            onError={(_e, _i, label) => addNotification(`⚠️ ${label} failed`, 'warn')}>
            <FaceRecognition enabled={true} />
          </ErrorBoundary>
        </div>
      )}
      {/* Visual alert overlay for hearing-impaired users */}
      <VisualAlert />
      {/* Offline voice badge — appears only when offline and voice is on */}
      {isOffline && voiceOn && (
        <div style={{
          position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, pointerEvents: 'none',
          background: 'rgba(0,0,0,0.6)', color: '#fbbf24',
          padding: '4px 12px', borderRadius: 99,
          fontSize: 11, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 6,
          backdropFilter: 'blur(8px)'
        }}>
          <span style={{ fontSize: 12 }}>📴</span>
          Offline — local voice
        </div>
      )}
      {/* Toast notifications */}
      <ToastContainer />
      {/* Phase 4 — Spotlight + Command Palette */}
      <Spotlight />
      {/* Phase 4 — Notification Center */}
      <NotificationCenter />
      {/* Iteration 7 — Lock screen overlay (self-hides when unlocked) */}
      <LockScreen />
      {/* Always-visible accessibility helpers */}
      {booted && <HelpButton />}
      {booted && <SOSButton />}
    </div>
  )
}

export default SpiritOSApp
