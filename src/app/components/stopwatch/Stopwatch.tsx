import './Stopwatch.css'
import React, { useState } from 'react';

/**
 * @interface {Object} Timer
 * @property {number} counter - Общее количество секунд
 * @property {number} minutes - Количество минут
 * @property {number} seconds - Количество секунд
 */
interface Timer {
  counter: number;
  minutes: number;
  seconds: number;
  milliSeconds: number;
}

/**
 * Компонент для отображения и управления секундомером.
 * @component
 */
const Stopwatch: React.FC = () => {
  const [timer, setTimer] = useState<Timer>({
    counter: 0,
    minutes: 0,
    seconds: 0,
    milliSeconds: 0,
  });
  const [timerStart, setTimerStart] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] = useState<number | undefined>();

  /**
   * Обработчик запуска секундомера.
   */
  function handleStart(): void {
    if (!timerStart) {
      setTimerInterval(window.setInterval(() => {
        setTimer(prev => ({
          counter: prev.counter + 10,
          minutes: Math.floor(prev.counter / 60000),
          seconds: Math.floor(prev.counter / 1000)%60,
          milliSeconds: prev.counter % 1000,
        }));
      }, 10));
      setTimerStart(true);
    }
  }

  /**
   * Обработчик приостановки секундомера.
   */
  function handlePause(): void {
    setTimerStart(false);
    clearInterval(timerInterval);
  }

  /**
   * Обработчик сброса секундомера.
   */
  function handleReset(): void {
    clearInterval(timerInterval);
    setTimerStart(false);
    setTimer({
      counter: 0,
      minutes: 0,
      seconds: 0,
      milliSeconds: 0,
    });
  }

  return (
    <div className='container'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>Секундомер</h1>
      <p className='flex gap-1 justify-center font-bold text-7xl'>
        <span className='numbers-cell'>{`${timer.minutes}`.padStart(2, '0')}</span>:
        <span className='numbers-cell'>{`${timer.seconds}`.padStart(2, '0')}</span>:
        <span className='numbers-cell'>{`${timer.milliSeconds / 10}`.padStart(2, '0')}</span>
      </p>
      <div className='buttons'>
        {[
          { label: 'Старт', className: 'button bg-green-400 hover:bg-green-500', fn: handleStart },
          { label: 'Пауза', className: 'button bg-neutral-400 hover:bg-neutral-500', fn: handlePause },
          { label: 'Сброс', className: 'button bg-red-400 hover:bg-red-500', fn: handleReset },
        ].map((item) => (
          <button key={item.label} className={`btn text-white font-medium ${item.className}`} onClick={item.fn}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;