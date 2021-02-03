import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import useInterval from './hooks/useInterval';
import { formatTime } from './misc/formatFunctions';

const INITIAL_COUNT_DOWN_TIME = 900;

enum alarmStates {
  OFF,
  ON,
  SNOOZED,
}

const App: React.FC = () => {
  const [initialTimer, setInitialTimer] = useState(INITIAL_COUNT_DOWN_TIME);
  const [stopwatch, setStopwatch] = useState(0);
  const [timer, setTimer] = useState(INITIAL_COUNT_DOWN_TIME);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useInterval(
    () => setStopwatch((state) => state + 1),
    isStopwatchRunning ? 1000 : null
  );
  useInterval(
    () => setTimer((state) => state - 1),
    isTimerRunning ? 1000 : null
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const strM = urlParams.get('m') || '';
    const strS = urlParams.get('s') || '';
    const m = /^\d+$/.test(strM) ? parseInt(strM) : 0;
    const s = /^\d+$/.test(strS) ? parseInt(strS) : 0;
    if (m > 0 || s > 0) {
      setInitialTimer(m * 60 + s);
      setTimer(m * 60 + s);
    }
  }, []);

  // Alarm effect
  const [isAlarmOn, setIsAlarmOn] = useState(alarmStates.OFF);
  useEffect(() => {
    if (isAlarmOn === alarmStates.OFF && timer < 0) {
      setIsAlarmOn(alarmStates.ON);
    } else if (isAlarmOn !== alarmStates.OFF && timer > 0) {
      setIsAlarmOn(alarmStates.OFF);
    }
  }, [isAlarmOn, timer]);

  return (
    <div
      className={`${styles.appWrapper} ${
        isAlarmOn === alarmStates.ON ? styles.bgAlarm : ''
      }`}
    >
      <div className={styles.buttonNav}>
        <button
          className={
            styles.button +
            (isStopwatchRunning && !isTimerRunning ? '' : ` ${styles.hidden}`)
          }
          onClick={() => setIsStopwatchRunning((state) => !state)}
        >
          Taka stóra pásu
        </button>
        {isAlarmOn === alarmStates.ON && (
          <button
            className={styles.button}
            onClick={() => setIsAlarmOn(alarmStates.SNOOZED)}
          >
            Blunda
          </button>
        )}
      </div>
      <div className={styles.clock}>{formatTime(stopwatch)}</div>
      <div className={styles.clock}>{formatTime(timer)}</div>

      <div className={styles.buttonNav}>
        {isStopwatchRunning && isTimerRunning && (
          <button
            className={styles.button}
            onClick={() => setIsTimerRunning(false)}
          >
            Pása
          </button>
        )}
        {isStopwatchRunning && !isTimerRunning && (
          <button
            className={styles.button}
            onClick={() => setIsTimerRunning((state) => !state)}
          >
            Halda áfram
          </button>
        )}
        {!isStopwatchRunning && !isTimerRunning && (
          <>
            <button
              className={styles.button}
              onClick={() => {
                setIsStopwatchRunning(true);
                setIsTimerRunning(true);
              }}
            >
              Byrja að lesa
            </button>
            {initialTimer !== timer && (
              <button
                className={styles.button}
                onClick={() => {
                  if (window.confirm('Ertu viss um að endurstilla?')) {
                    setStopwatch(0);
                    setTimer(initialTimer);
                  }
                }}
              >
                Endurstilla
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
