# AnimalZoo - Projektöversikt

## 📋 Om Projektet

En Next.js 16-webbapplikation för ett djurzoo. Användare kan utforska djur, boka vård, donera och hantera konton. Integrerad med OneEntry (CMS) för innehållshantering och Stripe för betalningar.

## 🛠️ Teknologi Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **UI-komponenter**: shadcn/ui (Radix UI primitiver)
- **CMS**: OneEntry API
- **Betalningar**: Stripe
- **Autentisering**: OneEntry AuthProvider (token-baserad)
- **Themes**: next-themes (mörkt/ljust läge)

## 📁 Mappstruktur

```
app/                          # Next.js App Router
├── (auth)/auth/             # Inloggnings- och registreringssidor
├── (main)/                  # Huvudlayout med Navbar och Footer
├── animals/[id]/            # Individuell djursida
├── booking/                 # Bokningssidor
├── donation-success/        # Donationsstatus-sidor
├── shop/animal-food/        # Produkter
├── actions/                 # Server actions (auth, booking, catalog)
└── api/                     # API-rutter (Stripe checkout, OneEntry)

components/                   # Återanvändbara komponenter
├── animalCard.tsx
├── animalCatalog.tsx
├── BookingForm.tsx
├── Navbar.tsx
├── Footer.tsx
└── ui/                      # shadcn/ui komponenter

lib/                          # Verktyg och API-klienter
├── oneentry.ts              # OneEntry API-setup
├── getAnimals.ts
├── getAnimalById.ts
└── utils.ts

types/                        # TypeScript-definitioner
└── animal.d.ts

public/                       # Statiska tillgångar (tom)
```

## 🔑 Huvudfunktionaliteter

| Funktion             | Implementering            | Status         |
| -------------------- | ------------------------- | -------------- |
| **Autentisering**    | OneEntry + cookies        | ✅             |
| **Djurbrowsing**     | getAnimals, getCatalog    | ✅             |
| **Bokning**          | bookCareAction → OneEntry | ⚠️ (debugging) |
| **Donationer**       | Stripe checkout           | ✅             |
| **Responsiv design** | Tailwind CSS              | ✅             |
| **Mörkt läge**       | next-themes               | ✅             |

## 🔐 Miljövariabler (`.env.local`)

```
ONEENTRY_PROJECT_URL=https://your-project.oneentry.cloud
ONEENTRY_TOKEN=your-api-token
STRIPE_PUBLIC_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
```

## 🚀 Kommandon

```bash
npm run dev      # Starta dev-server på :3000
npm run build    # Bygg för produktion
npm run start    # Kör produktionsserver
npm run lint     # Kör ESLint
```

### OneEntry Form Submission

- **Endpoint**: `POST /api/content/form-data`
- **Body struktur**:
  ```json
  {
    "formIdentifier": "booking_care",
    "formData": {
      "en_US": [{ "marker": "name", "value": "...", "type": "string" }]
    }
  }
  ```

## 🔄 Användarflöde

1. **Start** → Hemsidia med djurkatalog
2. **Autentisering** → Inloggning/registrering via OneEntry
3. **Djurutforskning** → Se djurdetaljsidor
4. **Bokning** → Fylla bokningsformulär → OneEntry → Bekräftelse
5. **Donation** → Stripe checkout → Success/Cancel

## 📌 Viktiga Noteringar

- **Server Actions**: Föredras för datamutationer (NextJS best practice)
- **FormData API**: Används i BookingForm för formulärsubmission
- **Token Management**: Refresh tokens lagras i cookies
- **Redirect**: Använd NextJS `redirect()` för post-submission navigation
- **Dark Mode**: Automatisk baserat på systempreferenser

**Sist uppdaterad**: 2026-01-16
