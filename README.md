# 🧠 GuessWhat — Угадай Кто!

Мобильная викторина-сравнение на React + TypeScript + Vite. Игрок сравнивает объекты
(«Кто тяжелее?», «Кто быстрее?»…) и набирает очки: `+1` за верный ответ, `-2` за ошибку.

**Играть:** https://supremegoogle.github.io/GuessWhat/

## Стек

| Слой | Технология |
|---|---|
| UI | React 18 + TypeScript (strict) |
| Сборка | Vite 6 |
| Стили | CSS3 — переменные, glassmorphism, градиенты |
| Иконки | lucide-react |
| Звук | Web Audio API (синтез, без внешних файлов) |
| Эффекты | canvas-confetti |

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # tsc + vite build → dist/
npm run lint     # tsc --noEmit
```

## Структура

```
src/
├── App.tsx              роутинг экранов, глобальный стейт
├── components/          SplashScreen, StartMenu, LevelSelect,
│                        Level1Game, LevelLockedModal
├── data/
│   ├── animals.ts       20 животных с весом и фактами
│   └── levels.ts        сетка из 30 уровней
├── types/index.ts       Animal, LevelInfo, GameStats, PairComparison
├── utils/audio.ts       SoundManager на Web Audio API
└── styles/index.css     дизайн-система
```

## Статус уровней

Уровень 1 («Кто тяжелее?») играбелен. Уровни 2–30 объявлены в `src/data/levels.ts`
и заблокированы. Текущий бэклог — в [TASKS.md](TASKS.md).

## Автоматизация

Ежедневная cloud-routine Claude берёт верхнюю задачу из `TASKS.md`, реализует её,
проверяет сборку и пушит результат в `main`. Правила проекта и инструкция для агента —
в [`.github/daily-task.md`](.github/daily-task.md). Пуш в `main` автоматически
запускает деплой на GitHub Pages.
