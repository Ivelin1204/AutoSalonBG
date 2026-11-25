import { useEffect, useRef, useState } from 'react';
import { useBooking } from '../../hooks/useBooking';
import { cx } from '../../utils/format';
import { getBotReply, QUICK_REPLIES, WELCOME_MESSAGE, type ChatMessage } from '../../utils/chatBot';

const BOT_DELAY_MS = 350;

export function ChatWidget() {
  const goBook = useBooking();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // Скрол до последното съобщение
  useEffect(() => {
    if (isOpen && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isOpen]);

  // Почистване на чакащите отговори при напускане
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const send = (text = input) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    const timer = window.setTimeout(() => setMessages((prev) => [...prev, getBotReply(trimmed)]), BOT_DELAY_MS);
    timers.current.push(timer);
  };

  const handleBook = (service?: string) => {
    setIsOpen(false);
    goBook(service);
  };

  return (
    <>
      <button
        type="button"
        className={cx('chat-fab', isOpen && 'is-hidden')}
        onClick={() => setIsOpen(true)}
        aria-label="Отвори чат"
      >
        <i className="fas fa-comment-dots" aria-hidden="true" />
      </button>

      <div className={cx('chat-panel', isOpen && 'is-open')} role="dialog" aria-label="Чат с асистент" aria-hidden={!isOpen}>
        <div className="chat-panel__header">
          <div className="chat-panel__title">
            <i className="fas fa-robot" aria-hidden="true" /> Асистент
          </div>
          <button type="button" className="chat-panel__close" onClick={() => setIsOpen(false)} aria-label="Затвори чат">
            ✕
          </button>
        </div>

        <div className="chat-panel__messages" ref={listRef} aria-live="polite">
          {messages.map((message, i) => (
            <div key={i} className={cx('chat-msg', `chat-msg--${message.from}`)}>
              <div className="chat-msg__bubble">{message.text}</div>
              {message.action === 'book' && (
                <button type="button" className="chat-msg__action" onClick={() => handleBook(message.actionService)}>
                  Към записване
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="chat-panel__quick">
          {QUICK_REPLIES.map((reply) => (
            <button key={reply} type="button" className="chat-chip" onClick={() => send(reply)}>
              {reply}
            </button>
          ))}
        </div>

        <form
          className="chat-panel__input"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Напишете съобщение..." aria-label="Съобщение" />
          <button type="submit" className="chat-panel__send" aria-label="Изпрати">
            <i className="fas fa-paper-plane" aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  );
}
