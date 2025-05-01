Okay, let's create a highly detailed checklist to migrate the content and functionality from the old website structure (represented by the provided `wolt.md` and Supabase schema) into the new "Cancel Wolt" Next.js application codebase.

The checklist is designed for an AI coding assistant with access *only* to the "NEW CANCEL WOLT EXPORT" codebase and this checklist. It assumes the AI can read, write, and modify files within that codebase structure.

**Checklist Structure:**

*   **Phase 0: Preparation & Environment Setup:** Setting up necessary files and configurations.
*   **Phase 1: Global Configuration (Fonts & Context):** Setting up fonts and ensuring context providers are ready.
*   **Phase 2: Content Extraction & Translation Data:** Populating the language context with all necessary text strings.
*   **Phase 3: Page Creation & Basic Content Integration:** Building the page structure and adding static translated content.
*   **Phase 4: Component Implementation & Feature Integration:** Implementing specific components like tables and the pledge form.
*   **Phase 5: Navigation & Linking:** Updating header/mobile menus and ensuring correct internal linking.
*   **Phase 6: Final Review & Cleanup:** Verification and code hygiene.

---

## Cancel Wolt - Content & Functionality Migration Checklist

**Objective:** Integrate text content, page structure, pledge functionality (Supabase), table data, and navigation from the old website concept into the new Next.js application, using the new site's components and styling conventions.

---

### Phase 0: Preparation & Environment Setup

*   `[ ]` **Verify Font Files:**
    *   Confirm that the Omnes font files (`Omnes Regular.ttf`, `Omnes Bold.ttf`, `Omnes SemiBold.ttf`, `Omnes Medium.ttf`, `Omnes Light.ttf`) have been placed inside the `/public/Omnes Font Family/` directory in the new project structure.
*   `[ ]` **Verify Image Files:**
    *   Confirm that the necessary card and page images (e.g., `hidden_cost.png`, `unfair_pricing.png`, `hurting_restaurants.png`, `fair_pay_for_workers.png`, `cancel_wolt.png`, `join_the_movement.png`, `wolt-merchant.png`, `wolt-merchant-success.png`, `wolt-growth.png`, `wolt-orders.png`, `wolt-delivery.png`, `restaurant_dependence.png`, `brand_control.png`, `wolt_algorithm.png`, `success-1.jpg`, `success-2.jpg`, `success-3.jpg`, `success-4.jpg`) have been placed inside the `/public/images/` directory. Create this directory if it doesn't exist.
*   `[ ]` **Supabase Environment Variables:**
    *   Ensure a `.env.local` file exists in the root of the project.
    *   Verify that the following variables are present and correctly set in `.env.local`:
        ```dotenv
        NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        # Optional: Set to true for development features like showing verification links
        NEXT_PUBLIC_DEV_MODE=false 
        # Optional: Set to your email for auto-verification during testing
        ADMIN_EMAIL=your_admin_email@example.com 
        ```
    *   *(Note: The AI assistant will use these variables but doesn't need the actual values, just confirmation they are set up).*

---

### Phase 1: Global Configuration (Fonts & Context)

*   `[ ]` **Load Omnes Font:**
    *   Open `app/globals.css`.
    *   Add the following `@font-face` rules at the beginning of the file to load the Omnes font family from the `/public` folder:
        ```css
        @font-face {
          font-family: 'Omnes';
          src: url('/Omnes Font Family/Omnes Regular.ttf') format('truetype');
          font-weight: 400; /* Regular */
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Omnes';
          src: url('/Omnes Font Family/Omnes Bold.ttf') format('truetype');
          font-weight: 700; /* Bold */
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Omnes';
          src: url('/Omnes Font Family/Omnes SemiBold.ttf') format('truetype');
          font-weight: 600; /* SemiBold */
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Omnes';
          src: url('/Omnes Font Family/Omnes Medium.ttf') format('truetype');
          font-weight: 500; /* Medium */
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Omnes';
          src: url('/Omnes Font Family/Omnes Light.ttf') format('truetype');
          font-weight: 300; /* Light */
          font-style: normal;
          font-display: swap;
        }
        ```
*   `[ ]` **Configure Tailwind Font Family:**
    *   Open `tailwind.config.ts`.
    *   Locate the `theme.extend.fontFamily` section.
    *   Add `'Omnes'` as the primary sans-serif font:
        ```typescript
        fontFamily: {
          // Add Omnes here, keeping existing sans as fallback
          sans: ['Omnes', 'Inter', 'ui-sans-serif', 'system-ui', /* ... other fallbacks */],
          // Optional: Define a specific key if needed elsewhere
          omnes: ['Omnes', 'sans-serif'], 
        },
        ```
    *   *(Note: The existing config might already have Inter or others; ensure Omnes is listed first in the `sans` array).*
*   `[ ]` **Verify Providers in Layout:**
    *   Open `app/layout.tsx`.
    *   Confirm that `<ThemeProvider>` and `<LanguageProvider>` wrap the `{children}` component. The existing structure seems correct.

---

### Phase 2: Content Extraction & Translation Data

*   `[ ]` **Update Language Context Translations:**
    *   Open `contexts/language-context.tsx`.
    *   Locate the `translations` object.
    *   **Replace** the *entire existing* `translations` object with the following comprehensive structure, including all extracted text from `wolt.md` and page requirements. *(Maintain the 'dk'/'eng' structure)*:

        ```typescript
        const translations = {
          // Common elements (Header, Footer, Buttons)
          common: {
            nav: {
              home: { dk: "Hjem", eng: "Home" },
              about: { dk: "Om Os", eng: "About" },
              pricing: { dk: "Priser", eng: "Pricing" },
              workers: { dk: "Arbejdere", eng: "Workers" },
              restaurants: { dk: "Restauranter", eng: "Restaurants" },
              alternatives: { dk: "Alternativer", eng: "Alternatives" },
              pledge: { dk: "Underskriv Løftet", eng: "Sign the Pledge" },
              contact: { dk: "Kontakt", eng: "Contact" },
              privacy: { dk: "Privatliv", eng: "Privacy" },
              successStories: { dk: "Succeshistorier", eng: "Success Stories" },
              // Existing keys from new site if needed elsewhere
              signUp: { dk: "Tilmeld dig", eng: "Sign Up" }, // Keep if used
              logIn: { dk: "Log ind", eng: "Log In" }, // Keep if used
            },
            button: {
              learnMore: { dk: "Læs mere", eng: "Learn More" },
              signPledge: { dk: "Skriv under på løftet", eng: "Sign the Pledge" },
              findAlternatives: { dk: "Find alternativer", eng: "Find Alternatives" },
              contactUs: { dk: "Kontakt os", eng: "Contact Us" },
              submit: { dk: "Indsend", eng: "Submit" },
              submitting: { dk: "Indsender...", eng: "Submitting..." },
              tryAgain: { dk: "Prøv igen", eng: "Try Again" },
              close: { dk: "Luk", eng: "Close" },
              backToHome: { dk: "Tilbage til forsiden", eng: "Back to Home" },
              verifyNowDev: { dk: "Bekræft nu (Udvikling)", eng: "Verify Now (Development)" },
            },
            footer: {
              rights: { dk: "Alle rettigheder forbeholdes", eng: "All Rights Reserved" },
              privacy: { dk: "Privatlivspolitik", eng: "Privacy Policy" },
              takeActionTitle: { dk: "Tag stilling mod urimelig praksis", eng: "Take a stand against unfair practices" },
              takeActionDesc: { dk: "Slut dig til tusinder af andre og skriv under på løftet for at støtte fair behandling af arbejdere og restauranter.", eng: "Join thousands of others in signing the pledge to support fair treatment of workers and restaurants." },
            },
            language: { dk: "Sprog", eng: "Language" },
            theme: { dk: "Tema", eng: "Theme" },
            light: { dk: "Lys", eng: "Light" },
            dark: { dk: "Mørk", eng: "Dark" },
            loading: { dk: "Indlæser...", eng: "Loading..." },
            error: { dk: "Fejl", eng: "Error" },
          },
          // Homepage Content
          home: {
            hero: {
              title: { dk: "Opsig Wolt", eng: "Cancel Wolt" },
              subtitle: { dk: "Deltag i bevægelsen mod høje provisioner, udnyttende praksis og urimelige gebyrer, der skader restauranter, arbejdere og forbrugere.", eng: "Join the movement against high commissions, exploitative practices, and unfair fees that hurt restaurants, workers, and consumers." }
            },
            whyCancelTitle: { dk: "Hvorfor Opsige Wolt?", eng: "Why Cancel Wolt?" },
            whyCancelDesc: { dk: "Wolt virker måske bekvemmeligt, men bag den smarte app skader tjenesten både forbrugere, arbejdere og lokale spisesteder. Denne protest opfordrer danske brugere til at opsige Wolt og støtte mere fair alternativer.", eng: "Wolt may seem convenient, but behind the slick app it's hurting consumers, workers, and local businesses. This protest calls on Danes to cancel Wolt and support fairer alternatives." },
            realWoltExperienceTitle: { dk: "Den Virkelige Wolt Oplevelse", eng: "The Real Wolt Experience" },
            hiddenCostsTitle: { dk: "De Skjulte Omkostninger ved Bekvemmelighed", eng: "The Hidden Costs of Convenience" },
            hiddenCostsP1: { dk: "Når du bestiller via Wolt, betaler du ikke kun for din mad. Der er et \"servicegebyr\" på omkring 5% på hver ordre (selv hvis du betaler for Wolt Plus)<0/>, og restauranter er nødt til at hæve deres menupriser med 20-30% bare for at overleve de høje 25-30% provisioner, Wolt opkræver dem.<1/>", eng: "When you order through Wolt, you're not just paying for your food. There's a \"service fee\" of around 5% on every order (even if you pay for Wolt Plus)<0/> and restaurants have to increase their menu prices by 20-30% just to survive the high 25-30% commissions Wolt charges them.<1/>" },
            hiddenCostsP2: { dk: "Dette betyder, at du ender med at betale betydeligt mere for det samme måltid, end hvis du bestilte direkte fra restauranten. Og med Wolts massive markedsdominans i Danmark (så stærk, at konkurrenten Foodora forlod landet i 2024<2/>), kan de fortsætte denne praksis uantastet.", eng: "This means you end up paying significantly more for the same meal than if you ordered directly from the restaurant. And with Wolt's massive market dominance in Denmark (so strong that rival Foodora quit the country in 2024<2/>), they can continue these practices unchallenged." },
            alternativesTitle: { dk: "Alternative Tjenester", eng: "Alternative Services" },
            alternativesDesc: { dk: "Der findes bedre muligheder:", eng: "There are better options available:" },
            alternativesList: {
              item1: { dk: "<strong>Just Eat</strong> tager en mere rimelig provision (omkring 10-15% for ordrer, hvor restauranter selv leverer)<0/> og har underskrevet en kollektiv overenskomst med 3F-fagforeningen for deres bude.", eng: "<strong>Just Eat</strong> takes a more reasonable commission (around 10-15% for orders where restaurants handle delivery)<0/> and has signed a collective agreement with the 3F union for their couriers." },
              item2: { dk: "<strong>Bestil Direkte</strong> fra restauranter via deres egne hjemmesider eller telefonisk. Dette sikrer, at 100% af din betaling går til restauranten.", eng: "<strong>Order Directly</strong> from restaurants through their own websites or by phone. This ensures 100% of your payment goes to the restaurant." },
              item3: { dk: "<strong>Lokal Afhentning</strong> fjerner leveringsgebyrer helt og hjælper med at støtte dine lokale forretninger.", eng: "<strong>Local Pickup</strong> options cut out delivery fees altogether and help support your local community businesses." },
            },
            joinMovementTitle: { dk: "Deltag i Bevægelsen I Dag", eng: "Join the Movement Today" },
            joinMovementDesc: { dk: "Ved at opsige dit Wolt-abonnement og vælge fair alternativer sender du et signal: Danske forbrugere værdsætter fair priser, arbejderrettigheder og blomstrende lokale restauranter højere end virksomheders grådighed.", eng: "By canceling your Wolt subscription and choosing fair alternatives, you send a message: Danish consumers value fair prices, worker rights, and thriving local restaurants over corporate greed." },
            // Feature/Info Card Content (Combined from featureData & infoCardData)
            card: {
              hiddenCosts: {
                title: { dk: "Skjulte Omkostninger", eng: "Hidden Costs" },
                description: { dk: "Wolt tilføjer ekstra gebyrer og tvinger restauranter til at hæve priserne, så du betaler op til 40% mere.", eng: "Wolt adds extra fees and forces restaurants to increase prices, making you pay up to 40% more." },
                linkText: { dk: "Se de reelle priser", eng: "See the real pricing" }
              },
              unfairPricing: {
                title: { dk: "Uretfærdige Priser", eng: "Unfair Pricing" },
                description: { dk: "Høje provisioner (25-30%) og ekstra servicegebyrer presser både restauranter og kunder.", eng: "High commissions (25-30%) and extra service fees squeeze both restaurants and customers." },
                linkText: { dk: "Læs mere", eng: "Learn more" }
              },
              hurtingRestaurants: {
                title: { dk: "Skader Restauranter", eng: "Hurting Restaurants" },
                description: { dk: "Lokale virksomheder mister fortjeneste og kontrol over deres brand ved brug af Wolt.", eng: "Local businesses lose profit margins and control over their brand when using Wolt." },
                linkText: { dk: "Hvordan restauranter lider", eng: "How restaurants suffer" }
              },
              workerExploitation: {
                title: { dk: "Udnyttelse af Arbejdere", eng: "Worker Exploitation" },
                description: { dk: "Kurerer mangler grundlæggende arbejderbeskyttelse som sygedagpenge, feriepenge og garanterede timer.", eng: "Couriers lack basic worker protections like sick pay, holiday pay, and guaranteed hours." },
                linkText: { dk: "Støt retfærdige forhold", eng: "Support fair conditions" }
              },
              cancelWolt: {
                title: { dk: "Afbestil Wolt", eng: "Cancel Wolt" },
                description: { dk: "Deltag i bevægelsen for at skabe et mere retfærdigt madleveringsøkosystem i Danmark.", eng: "Join the movement to create a fairer food delivery ecosystem in Denmark." },
                linkText: { dk: "Skriv under på løftet", eng: "Sign the pledge" }
              },
              betterAlternatives: {
                title: { dk: "Bedre Alternativer", eng: "Better Alternatives" },
                description: { dk: "Skift til platforme, der behandler arbejdere fair og opkræver restauranter rimelige gebyrer.", eng: "Switch to platforms that treat workers fairly and charge restaurants reasonable fees." },
                linkText: { dk: "Find alternativer", eng: "Find alternatives" }
              }
            },
            // Citations for Homepage
            citations: {
              source1: { dk: "Wolt Gebyrstruktur, 2024", eng: "Wolt Fee Structure, 2024" },
              source2: { dk: "Restaurationsbranchens Brancheforening Undersøgelse, 2023", eng: "Restaurant Association of Denmark Survey, 2023" },
              source3: { dk: "Foodora Danmark Exit Pressemeddelelse, 2024", eng: "Foodora Denmark Exit Press Release, 2024" },
              source4: { dk: "Just Eat Partnerprogram, 2024", eng: "Just Eat Partner Program, 2024" },
            }
          },
          // About Page Content
          about: {
            hero: {
              title: { dk: "Om Bevægelsen", eng: "About the Movement" },
              subtitle: { dk: "Et græsrodsinitiativ for at fremme fair madlevering i Danmark", eng: "A grassroots initiative to promote fair food delivery in Denmark" }
            },
            missionTitle: { dk: "Vores Mission", eng: "Our Mission" },
            missionP1: { dk: "Cancel Wolt initiativet er en græsrodsbevægelse skabt af bekymrede danske forbrugere, restaurantejere og leveringsbude, der tror på fair forretningspraksis inden for madleveringsøkosystemet.", eng: "The Cancel Wolt initiative is a grassroots movement created by concerned Danish consumers, restaurant owners, and delivery workers who believe in fair business practices within the food delivery ecosystem." },
            missionP2: { dk: "Vi sigter mod at øge bevidstheden om de skjulte omkostninger ved bekvemmelighed og arbejde hen imod et mere retfærdigt madleveringsmarked, der respekterer:", eng: "We aim to raise awareness about the hidden costs of convenience and work toward a more equitable food delivery market that respects:" },
            missionList: {
              item1: { dk: "Fair priser for forbrugerne", eng: "Fair pricing for consumers" },
              item2: { dk: "Rimelige provisioner for restauranter", eng: "Reasonable commissions for restaurants" },
              item3: { dk: "Korrekt arbejdstagerbeskyttelse for bude", eng: "Proper worker protections for couriers" },
              item4: { dk: "Gennemsigtige forretningspraksisser", eng: "Transparent business practices" },
            },
            missionP3: { dk: "Dette handler ikke om at ødelægge madleveringstjenester – det handler om at gøre dem bedre for alle involverede. Vi tror på, at forbrugere, når de er informerede, vil træffe valg, der stemmer overens med deres værdier.", eng: "This is not about destroying food delivery services—it's about making them better for everyone involved. We believe that consumers, when informed, will make choices that align with their values." },
            whyMattersTitle: { dk: "Hvorfor Er Dette Vigtigt?", eng: "Why This Matters" },
            whyMattersP1: { dk: "<strong>For Forbrugere:</strong> Du fortjener at kende den sande pris på din madlevering og hvordan dine valg påvirker dit lokalsamfund. Når du bestiller gennem Wolt, betaler du betydeligt mere, end du ville ved at bestille direkte fra restauranter – ikke kun gennem leveringsgebyrer, men gennem oppustede menupriser, der er nødvendige for at dække Wolts høje provisioner.", eng: "<strong>For Consumers:</strong> You deserve to know the true cost of your food delivery and how your choices impact your community. When you order through Wolt, you're paying significantly more than you would ordering directly from restaurants—not just through delivery fees, but through inflated menu prices needed to cover Wolt's high commissions." },
            whyMattersP2: { dk: "<strong>For Restauranter:</strong> Små lokale etablissementer kæmper med knivskarpe marginer, der presses endnu mere af massive provisioner. I Aalborg boykottede over 30 restauranter Wolt i 2022<0/>, fordi de \"ikke kunne få enderne til at mødes\" med Wolts 25-30% andel af hvert salg.", eng: "<strong>For Restaurants:</strong> Small local establishments are struggling with razor-thin margins that get squeezed even further by massive commissions. In Aalborg, over 30 restaurants boycotted Wolt in 2022<0/> because they \"couldn't make ends meet\" with Wolt's 25-30% cut of every sale." },
            whyMattersP3: { dk: "<strong>For Arbejdere:</strong> Leveringsbude fortjener grundlæggende beskyttelse, der er standard i dansk beskæftigelse – sygedagpenge, feriepenge, pensionsbidrag og forsikring. Wolts \"partner\"-model omgår disse ansvarsområder, mens den presser bude til at levere hurtigere for konkurrencedygtige betalingssatser.", eng: "<strong>For Workers:</strong> Delivery couriers deserve basic protections that are standard in Danish employment—sick pay, holiday pay, pension contributions, and insurance. Wolt's \"partner\" model sidesteps these responsibilities while pushing couriers to deliver faster for competitive pay rates." },
            howToHelpTitle: { dk: "Hvordan Du Kan Hjælpe", eng: "How You Can Help" },
            howToHelpItems: {
              item1Title: { dk: "1. Skriv under på løftet", eng: "1. Sign the Pledge" },
              item1Desc: { dk: "Forpligt dig til at undgå Wolt og vælge mere fair alternativer. Hver underskrift sender et budskab om, at danske forbrugere går op i fair forretningspraksis.", eng: "Commit to avoiding Wolt and choosing fairer alternatives. Each pledge sends a message that Danish consumers care about fair business practices." },
              item2Title: { dk: "2. Spred Ordet", eng: "2. Spread the Word" },
              item2Desc: { dk: "Del denne hjemmeside med venner, familie og på sociale medier. Jo flere der kender til disse problemer, jo større indflydelse kan vi have.", eng: "Share this website with friends, family, and on social media. The more people know about these issues, the more impact we can have." },
              item3Title: { dk: "3. Bestil Direkte", eng: "3. Order Directly" },
              item3Desc: { dk: "Når det er muligt, bestil direkte fra restauranter via deres hjemmesider eller telefonisk. Dette sikrer, at de modtager 100% af din betaling.", eng: "When possible, order directly from restaurants through their websites or by phone. This ensures they receive 100% of your payment." },
              item4Title: { dk: "4. Støt Vores Alternativer", eng: "4. Support Our Alternatives" },
              item4Desc: { dk: "Brug vores alternativ-finder til at opdage leveringsmuligheder, der behandler arbejdere og restauranter mere retfærdigt.", eng: "Use our alternatives finder to discover delivery options that treat workers and restaurants more fairly." },
            },
            citations: {
              source1: { dk: "Aalborg Restaurant Boykot Rapport, 2022", eng: "Aalborg Restaurant Boycott Report, 2022" }
            }
          },
          // Pricing Page Content
          pricing: {
            hero: {
              title: { dk: "Dyre & Uretfærdige Priser", eng: "Overpriced & Unfair Pricing" },
              subtitle: { dk: "Hvordan Wolts gebyrstruktur skader forbrugere og restauranter", eng: "How Wolt's fee structure hurts consumers and restaurants" }
            },
            realPriceTitle: { dk: "Den Pris Du Reelt Betaler", eng: "The Price You Really Pay" },
            hiddenFeesTitle: { dk: "Skjulte Gebyrer Du Betaler", eng: "Hidden Fees You're Paying" },
            hiddenFeesDesc: { dk: "Når du bestiller gennem Wolt, er prisen du betaler markant højere end ved direkte bestilling fra restauranten på grund af flere lag af gebyrer:", eng: "When you order through Wolt, the price you pay is significantly higher than ordering directly from the restaurant due to multiple layers of fees:" },
            hiddenFeesList: {
              item1: { dk: "<strong>Servicegebyr:</strong> Wolt tilføjer et ekstra \"servicegebyr\" på ~5% på hver ordre, selv hvis du allerede betaler for Wolt Plus.<0/> Dette kommer oveni det leveringsgebyr, du allerede betaler.", eng: "<strong>Service Fee:</strong> Wolt adds an additional ~5% \"service fee\" on every order, even if you already pay for Wolt Plus.<0/> This is on top of the delivery fee you're already paying." },
              item2: { dk: "<strong>Oppustede Menupriser:</strong> Restauranter er nødt til at hæve deres menupriser på Wolt med ~20–30% bare for at overleve de høje provisioner.<1/> Det betyder, at du betaler mere for præcis det samme måltid, end hvis du bestilte direkte.", eng: "<strong>Inflated Menu Prices:</strong> Restaurants must increase their menu prices on Wolt by ~20–30% just to survive the high commissions.<1/> This means you're paying more for the exact same meal than if you ordered directly." },
              item3: { dk: "<strong>Leveringsgebyr:</strong> Standardgebyret for levering, som varierer med afstanden, men typisk starter ved 29-39 kr.", eng: "<strong>Delivery Fee:</strong> The standard fee for delivery, which varies by distance but typically starts at 29-39 DKK." },
              item4: { dk: "<strong>Lille Ordre Gebyr:</strong> Et ekstra gebyr for ordrer under et bestemt beløb, typisk 120-150 kr.", eng: "<strong>Small Order Fee:</strong> An additional fee for orders below a certain amount, typically 120-150 DKK." },
            },
            exampleTitle: { dk: "Eksempel: 200 kr Ordre", eng: "Example: 200 DKK Order" },
            exampleDesc: { dk: "Sådan fordeler en typisk 200 kr ordre sig:", eng: "Here's how a typical 200 DKK order breaks down:" },
            exampleList: {
              item1: { dk: "Original restaurantpris: ~155 kr", eng: "Original restaurant price: ~155 DKK" },
              item2: { dk: "Wolt markup: ~45 kr (29% stigning)", eng: "Wolt markup: ~45 DKK (29% increase)" },
              item3: { dk: "Leveringsgebyr: 39 kr", eng: "Delivery fee: 39 DKK" },
              item4: { dk: "Servicegebyr: ~10 kr (5% af ordren)", eng: "Service fee: ~10 DKK (5% of order)" },
              item5: { dk: "<strong>Total du betaler: 249 kr</strong>", eng: "<strong>Total you pay: 249 DKK</strong>" },
              item6: { dk: "Total hvis bestilt direkte: 155 kr (60% billigere)", eng: "Total if ordered directly: 155 DKK (60% cheaper)" },
            },
            woltPlusNote: { dk: "Selv med et Wolt+ abonnement (som koster 49 kr/mdr), betaler du stadig servicegebyret og de oppustede menupriser.", eng: "Even with a Wolt+ subscription (which costs 49 DKK/month), you're still paying the service fee and inflated menu prices." },
            comparisonTitle: { dk: "Gebyroversigt: Wolt vs Alternativer", eng: "Fee Comparison: Wolt vs Alternatives" },
            comparisonDesc: { dk: "Denne tabel sammenligner gebyrer og politikker på tværs af forskellige bestillingsmuligheder og viser, hvor meget dyrere Wolt er sammenlignet med alternativer:", eng: "This table compares the fees and policies across different food ordering options, showing how much more expensive Wolt is compared to alternatives:" },
            priceDifferenceNote: { dk: "Prisforskellene er betydelige. For en typisk ordre kan du spare 30-40% ved at bestille direkte fra restauranten i stedet for at bruge Wolt.", eng: "The price differences are substantial. For a typical order, you could save 30-40% by ordering directly from the restaurant instead of using Wolt." },
            priceParityTitle: { dk: "Konkurrencehæmmende Prisparitetsklausuler", eng: "Anti-Competitive Price Parity Clauses" },
            priceParityP1: { dk: "Wolt har håndhævet en regel om, at restauranter ikke må tilbyde lavere priser i butikken eller på andre platforme end på Wolt.<2/> Denne konkurrencebegrænsende klausul (som nu er under juridisk udfordring i Danmark) tvinger priserne op over hele linjen og forhindrer dig i at få en bedre aftale ved at bestille direkte.", eng: "Wolt has enforced a rule that restaurants can't offer lower prices in-store or on other platforms than on Wolt.<2/> This anti-competitive clause (now under legal challenge in Denmark) forces prices up across the board and prevents you from getting a better deal by ordering directly." },
            priceParityP2: { dk: "I Finland tvang myndighederne allerede Wolt til at droppe denne klausul<3/> efter at have fastslået, at den var skadelig for markedskonkurrencen.", eng: "In Finland, regulators already forced Wolt to drop this clause<3/> after determining it was harmful to market competition." },
            whatThisMeansTitle: { dk: "Hvad Betyder Dette For Dig?", eng: "What This Means For You" },
            whatThisMeansDesc: { dk: "På grund af disse prisparitetsklausuler kan selv restauranter, der ønsker at tilbyde dig bedre priser ved direkte bestilling, ikke gøre det eksplicit. Dette holder priserne kunstigt høje på tværs af alle kanaler.", eng: "Because of these price parity clauses, even restaurants that want to offer you better prices when you order directly can't do so explicitly. This artificially keeps prices high across all channels." },
            competitorNote: { dk: "Konkurrenter som Just Eat tager en mindre provision fra restauranter – omkring 10–15% for ordrer, hvor restauranter selv håndterer leveringen<4/> – betydeligt mindre end Wolts ~30%.", eng: "Competitors like Just Eat take a smaller commission from restaurants—around 10–15% for orders where restaurants handle delivery themselves<4/>—significantly less than Wolt's ~30%." },
            stopPayingTitle: { dk: "Stop Med At Betale Skjulte Gebyrer", eng: "Stop Paying Hidden Fees" },
            stopPayingDesc: { dk: "Ved at vælge alternativer til Wolt sparer du ikke kun penge, men støtter også fair praksis i madleveringsøkosystemet.", eng: "By choosing alternatives to Wolt, you not only save money but also support fair practices in the food delivery ecosystem." },
            // Card Data (reuse from home.card)
            // Comparison Table Headers/Labels
            table: {
              feature: { dk: "Funktion", eng: "Feature" },
              directOrder: { dk: "Direkte Bestilling", eng: "Direct Order" },
              commission: { dk: "Restaurant Provision", eng: "Restaurant Commission" },
              serviceFee: { dk: "Servicegebyr (Kunde)", eng: "Service Fee (Customer)" },
              deliveryFee: { dk: "Leveringsgebyr", eng: "Delivery Fee" },
              smallOrderFee: { dk: "Lille Ordre Gebyr", eng: "Small Order Fee" },
              priceParity: { dk: "Prisparitetsklausul", eng: "Price Parity Clause" },
              menuPriceIncrease: { dk: "Menupris Stigning", eng: "Menu Price Increase" },
              basePrice: { dk: "Grundlæggende Madpris", eng: "Base Food Price" },
              menuMarkup: { dk: "Menupris Markup", eng: "Menu Price Markup" },
              totalYouPay: { dk: "Total Du Betaler", eng: "Total You Pay" },
              realCostTitle: { dk: "Reel Omkostningseksempel: 200 kr Ordre", eng: "Real Cost Example: 200 kr Order"},
              realCostDesc: { dk: "Hvordan det samme måltid ville koste på tværs af forskellige platforme", eng: "How the same meal would cost across different platforms" },
            },
            // Citations for Pricing Page
            citations: {
              source1: { dk: "Wolt Gebyrstruktur Analyse, 2023", eng: "Wolt Fee Structure Analysis, 2023" },
              source2: { dk: "Restaurant Prisundersøgelse, København, 2023", eng: "Restaurant Pricing Study, Copenhagen, 2023" },
              source3: { dk: "Konkurrence- og Forbrugerstyrelsens Undersøgelse, 2023", eng: "Danish Competition Authority Investigation, 2023" },
              source4: { dk: "Finsk Konkurrencemyndigheds Afgørelse, 2022", eng: "Finnish Competition Authority Ruling, 2022" },
              source5: { dk: "Just Eat Partnerprogram, Danmark, 2023", eng: "Just Eat Partner Program, Denmark, 2023" },
            }
          },
          // Workers Page Content
          workers: {
            hero: {
              title: { dk: "Udnyttelse af Leveringsbude", eng: "Exploitation of Delivery Workers" },
              subtitle: { dk: "Hvordan Wolts forretningsmodel underminerer danske arbejdsstandarder", eng: "How Wolt's business model undermines Danish labor standards" }
            },
            noProtectionsTitle: { dk: "'Partnere' Uden Beskyttelse", eng: "'Partners' Without Protections" },
            noProtectionsP1: { dk: "Wolt klassificerer sine bude som uafhængige \"partnere\" frem for ansatte. Denne skelnen er afgørende, fordi den tillader Wolt at undgå at yde de standardydelser og beskyttelser, som danske arbejdere typisk modtager.", eng: "Wolt classifies its couriers as independent \"partners\" rather than employees. This distinction is crucial because it allows Wolt to avoid providing the standard benefits and protections that Danish workers typically receive." },
            noProtectionsP2: { dk: "Dette betyder, at budene mangler:", eng: "This means couriers lack:" },
            noProtectionsList1: {
              item1: { dk: "Garanteret timeløn", eng: "Hourly wage guarantees" },
              item2: { dk: "Sygedagpenge", eng: "Sick pay" },
              item3: { dk: "Feriepenge", eng: "Holiday pay" },
              item4: { dk: "Forsikringsdækning", eng: "Insurance coverage" },
              item5: { dk: "Pensionsbidrag<0/>", eng: "Pension contributions<0/>" },
            },
            noProtectionsP3: { dk: "I stedet bærer budene alle risici og omkostninger selv, herunder:", eng: "Instead, couriers shoulder all the risks and costs themselves, including:" },
            noProtectionsList2: {
              item1: { dk: "Køb og vedligeholdelse af cykel/køretøj", eng: "Bicycle/vehicle purchase and maintenance" },
              item2: { dk: "Smartphone og dataabonnementer", eng: "Smartphone and data plans" },
              item3: { dk: "Ansvar ved ulykker", eng: "Accident liability" },
              item4: { dk: "Skatter og regnskab<1/>", eng: "Taxes and accounting<1/>" },
            },
            noProtectionsP4: { dk: "Imens undgår Wolt det arbejdsgiveransvar, der er grundlæggende for den danske arbejdsmodel.<2/>", eng: "Meanwhile, Wolt avoids the employer responsibilities that are fundamental to the Danish labor model.<2/>" },
            comparisonTitle: { dk: "Sammenligning af Arbejdsvilkår", eng: "Comparing Worker Conditions" },
            comparisonDesc: { dk: "Tabellen nedenfor viser, hvor drastisk forskellige arbejdstagerbeskyttelser er på tværs af forskellige leveringsmodeller:", eng: "The table below shows how drastically different worker protections are across different delivery models:" },
            comparisonNote: { dk: "Som sammenligningen viser, mangler Wolt-bude stort set alle standardansættelsesbeskyttelser, som danske arbejdere er vant til. I modsætning hertil har Just Eat taget skridt til at give sine bude ordentlig ansættelsesstatus, herunder underskrivelse af en kollektiv overenskomst med 3F-fagforeningen i 2021.<3/>", eng: "As the comparison shows, Wolt couriers lack virtually every standard employment protection that Danish workers have come to expect. In contrast, Just Eat has taken steps to provide proper employment status to its couriers, including signing a collective agreement with the 3F union in 2021.<3/>" },
            lowEarningsTitle: { dk: "Lav & Ustabil Indtjening", eng: "Low & Unstable Earnings" },
            lowEarningsP1: { dk: "Wolt-bude betales pr. levering, typisk omkring 45 kr. pr. tur (før skat). Mens Wolt reklamerer med potentialet for at tjene \"op til\" 120 kr/time, er dette kun muligt i spidsbelastningsperioder, hvis et bud formår at sikre en af de begrænsede \"vagter\" og fuldføre leveringer med maksimal effektivitet.<4/>", eng: "Wolt riders are paid per delivery, typically about 45 DKK per drop (before tax). While Wolt advertises the potential to earn \"up to\" 120 DKK/hour, this is only possible during peak hours if a courier manages to secure one of the limited \"shifts\" and complete deliveries at maximum efficiency.<4/>" },
            lowEarningsP2: { dk: "Virkeligheden for de fleste bude inkluderer:", eng: "The reality for most couriers includes:" },
            lowEarningsList: {
              item1: { dk: "Ingen garanteret indkomst (reelt en nul-timers kontrakt)", eng: "No guaranteed income (effectively a zero-hour contract)" },
              item2: { dk: "Lange ventetider mellem leveringer uden for spidsbelastningsperioder", eng: "Long waits between deliveries during off-peak hours" },
              item3: { dk: "Konkurrence mellem bude om tilgængelige vagter", eng: "Competition between couriers for available shifts" },
              item4: { dk: "Betalingssatser, der efter sigende er faldet over tid, især efter Foodoras exit reducerede konkurrencen<5/>", eng: "Payment rates that have reportedly decreased over time, especially after Foodora's exit reduced competition<5/>" },
            },
            realImpactTitle: { dk: "Reel Verdens Påvirkning", eng: "Real-World Impact" },
            realImpactQuote: { dk: "\"Nogle uger arbejder jeg 50 timer og tjener knap mindstelønnen efter udgifter. Når det regner eller sner, tager vi al risikoen, men Wolt tager al fortjenesten.\" – Anonymt Wolt-bud, København", eng: "\"Some weeks I work 50 hours and barely make minimum wage after expenses. When it rains or snows, we take all the risk but Wolt takes all the profit.\" — Anonymous Wolt courier, Copenhagen" },
            safetyRisksTitle: { dk: "Pres og Sikkerhedsrisici", eng: "Pressure and Safety Risks" },
            safetyRisksP1: { dk: "Wolts algoritme belønner hastighed, hvilket øger presset på budene for at levere så hurtigt som muligt. Dette skaber alvorlige sikkerhedsrisici, især i travle byområder som København, hvor bude navigerer gennem trafik, mens de tjekker deres telefoner for rutevejledning.<6/>", eng: "Wolt's algorithm rewards speed, which increases pressure on couriers to deliver as quickly as possible. This creates serious safety risks, especially in busy urban areas like Copenhagen where couriers navigate through traffic while checking their phones for directions.<6/>" },
            safetyRisksP2: { dk: "Systemet skaber flere farer:", eng: "The system creates multiple hazards:" },
            safetyRisksList: {
              item1: { dk: "Incitamenter til at skynde sig gennem trafikken for at maksimere leveringer pr. time", eng: "Incentives to rush through traffic to maximize deliveries per hour" },
              item2: { dk: "Pres for at køre i farlige vejrforhold", eng: "Pressure to ride in dangerous weather conditions" },
              item3: { dk: "Distraheret kørsel under håndtering af app-grænsefladen", eng: "Distracted riding while managing the app interface" },
              item4: { dk: "Lange arbejdstider, der fører til træthed og nedsat opmærksomhed", eng: "Long hours leading to fatigue and decreased awareness" },
            },
            safetyRisksP3: { dk: "Hvis bude ikke lever op til Wolts strenge standarder (selv trivielle som hvordan de bærer en pizza), kan Wolt deaktivere (\"fyre\") bude efter forgodtbefindende med ringe mulighed for indsigelse.<7/> Men når bude kommer til skade på jobbet, har Wolt historisk set fraskrevet sig ansvaret, da de ikke er \"ansatte\".", eng: "If couriers fail to meet Wolt's strict standards (even trivial ones like how they carry a pizza), Wolt can deactivate (\"fire\") riders at will with little recourse.<7/> Yet, when couriers get hurt on the job, Wolt has historically claimed no responsibility as they're not \"employees.\"" },
            pushbackTitle: { dk: "Myndigheder Presser Tilbage", eng: "Authorities Push Back" },
            pushbackDesc: { dk: "Danske myndigheder er begyndt at udfordre Wolts arbejdsmodel:", eng: "Danish authorities have started to challenge Wolt's labor model:" },
            pushbackList: {
              item1: { dk: "<strong>Arbejdsmarkedets Erhvervssikring</strong> har afgjort, at Wolt skal kompensere tilskadekomne bude, hvilket reelt anerkender dem som ansatte under loven.<8/>", eng: "<strong>Danish Occupational Injury Authority</strong> ruled that Wolt must compensate injured couriers, effectively recognizing them as employees under the law.<8/>" },
              item2: { dk: "<strong>Styrelsen for International Rekruttering og Integration (SIRI)</strong> behandler nu Wolt-bude som havende en arbejdsgiver, ikke som ægte freelancere, i forbindelse med opholdstilladelser.<9/>", eng: "<strong>Denmark's Immigration Service (SIRI)</strong> now treats Wolt riders as having an employer, not as true freelancers, for residency permit purposes.<9/>" },
              item3: { dk: "<strong>Fagforeningen 3F</strong> har anlagt flere sager, der udfordrer klassificeringen af madleveringsarbejdere som selvstændige.", eng: "<strong>3F Union</strong> has filed multiple cases challenging the contractor classification of food delivery workers." },
            },
            pushbackP2: { dk: "På trods af disse afgørelser fortsætter Wolt med at kæmpe imod omklassificering af bude som ansatte<10/> og modstår de grundlæggende rettigheder og beskyttelser, som danske arbejdere typisk nyder godt af.", eng: "Despite these rulings, Wolt continues to fight against reclassifying couriers as employees,<10/> resisting the basic rights and protections that Danish workers typically enjoy." },
            competitorsBetterTitle: { dk: "Konkurrenter Behandler Arbejdere Bedre", eng: "Competitors Treat Workers Better" },
            competitorsBetterP1: { dk: "I modsætning til Wolt ansætter Just Eat mange af sine bude på formelle kontrakter (ofte deltid) og underskrev en kollektiv overenskomst med 3F-fagforeningen i 2021.<11/>", eng: "Unlike Wolt, Just Eat employs many of its couriers on formal contracts (often part-time) and signed a collective bargaining agreement with the 3F union in 2021.<11/>" },
            competitorsBetterP2: { dk: "Foodora i andre nordiske lande har historisk ansat bude som medarbejdere og indgået fagforeningsaftaler (f.eks. Norge i 2019 efter budene strejkede).<12/>", eng: "Foodora in other Nordic countries has historically hired couriers as employees and reached union agreements (e.g., Norway in 2019 after couriers went on strike).<12/>" },
            standWithWorkersTitle: { dk: "Stå Sammen Med Arbejderne", eng: "Stand With Workers" },
            standWithWorkersDesc: { dk: "Ved at vælge alternativer til Wolt støtter du bedre behandling af de mennesker, der leverer din mad. Hver ordre tæller.", eng: "By choosing alternatives to Wolt, you're supporting better treatment of the people who deliver your food. Every order matters." },
            // Worker Comparison Table Labels
            table: {
              employmentStatus: { dk: "Ansættelsesstatus", eng: "Employment Status" },
              unionAgreement: { dk: "Overenskomst", eng: "Union Agreement" },
              sickPay: { dk: "Sygedagpenge", eng: "Sick Pay" },
              holidayPay: { dk: "Feriepenge", eng: "Holiday Pay" },
              pension: { dk: "Pensionsbidrag", eng: "Pension Contributions" },
              insurance: { dk: "Arbejdsskadeforsikring", eng: "Work Injury Insurance" },
              equipment: { dk: "Udstyrsomkostninger", eng: "Equipment Costs" },
              guaranteedHours: { dk: "Garanterede Timer", eng: "Guaranteed Hours" },
              woltValuePartner: { dk: "Uafhængig \"Partner\"", eng: "Independent \"Partner\"" },
              woltValueNo: { dk: "Nej", eng: "No" },
              woltValueLimited: { dk: "Nej (begrænset dækning)", eng: "No (limited coverage)" },
              woltValueRiderPays: { dk: "Budet betaler alt", eng: "Rider pays all" },
              justEatValueEmployee: { dk: "Ansatte (ofte deltid)", eng: "Employee (often part-time)" },
              justEatValueYes3F: { dk: "Ja (3F)", eng: "Yes (3F)" },
              justEatValueYes: { dk: "Ja", eng: "Yes" },
              justEatValueCompanyProvides: { dk: "Firmaet stiller til rådighed", eng: "Company provides" },
              directValueEmployee: { dk: "Ansatte", eng: "Employee" },
              directValueVaries: { dk: "Varierer pr. restaurant", eng: "Varies by restaurant" },
              directValueYes: { dk: "Ja", eng: "Yes" },
              directValueCompanyProvides: { dk: "Firmaet stiller til rådighed", eng: "Company provides" },
              comparisonTableTitle: { dk: "Arbejdsvilkår og Fordele", eng: "Worker Conditions and Benefits" }
            },
            // Citations for Workers Page
            citations: {
              source1: { dk: "Dansk Arbejdsmarkedsstandard Rapport, 2023", eng: "Danish Labor Standards Report, 2023" },
              source2: { dk: "Analyse af Budeomkostninger, København, 2023", eng: "Courier Costs Analysis, Copenhagen, 2023" },
              source3: { dk: "Dansk Fagforeningsrapport om Gig-økonomi, 2023", eng: "Danish Labor Union Report on Gig Economy, 2023" },
              source4: { dk: "Just Eat-3F Kollektiv Overenskomst, 2021", eng: "Just Eat-3F Collective Agreement, 2021" },
              source5: { dk: "Wolt Budindtjeningsundersøgelse, 2023", eng: "Wolt Courier Earnings Survey, 2023" },
              source6: { dk: "Budinterviews, Copenhagen Post, 2024", eng: "Courier Interviews, Copenhagen Post, 2024" },
              source7: { dk: "Trafiksikkerhedsundersøgelse af Madleveringsbude, 2023", eng: "Traffic Safety Study on Food Delivery Couriers, 2023" },
              source8: { dk: "Analyse af Buddeaktiveringspolitikker, 2023", eng: "Courier Deactivation Policies Analysis, 2023" },
              source9: { dk: "Arbejdsmarkedets Erhvervssikrings Afgørelse, 2023", eng: "Danish Occupational Injury Authority Ruling, 2023" },
              source10: { dk: "SIRI Immigrationsvejledning Opdatering, 2023", eng: "SIRI Immigration Guidelines Update, 2023" },
              source11: { dk: "Rapport om Wolts Juridiske Udfordringer, 2023", eng: "Wolt Legal Challenges Report, 2023" },
              source12: { dk: "Just Eat-3F Kollektiv Overenskomst, 2021", eng: "Just Eat-3F Collective Agreement, 2021" }, // Repeated, ok
              source13: { dk: "Foodora Norge Fagforeningsaftale, 2019", eng: "Foodora Norway Union Agreement, 2019" },
            }
          },
          // Restaurants Page Content
          restaurants: {
            hero: {
              title: { dk: "Skader Lokale Restauranter", eng: "Hurting Local Restaurants" },
              subtitle: { dk: "Hvordan Wolts høje provisioner og praksis presser lokale virksomheder", eng: "How Wolt's high commissions and practices squeeze local businesses" }
            },
            commissionSqueezeTitle: { dk: "Kommissionspresset", eng: "The Commission Squeeze" },
            commissionSqueezeP1: { dk: "Lokale restauranter er fanget i en svær situation med Wolt. Kombinationen af høje provisioner og tvungen prismatch rammer især små virksomheder hårdt:", eng: "Local restaurants are caught in a difficult bind with Wolt. The combination of high commissions and forced price-matching hits small businesses particularly hard:" },
            commissionSqueezeList: {
              item1: { dk: "<strong>Høje Provisionssatser:</strong> Wolt opkræver restauranter 25-30% provision på hver ordre.<0/> For mange restauranter er deres fortjenstmargen kun 3-5% til at begynde med.", eng: "<strong>High Commission Rates:</strong> Wolt charges restaurants 25-30% commission on every order.<0/> For many restaurants, their profit margin is only 3-5% to begin with." },
              item2: { dk: "<strong>Prisparitetskrav:</strong> Restauranter kan ikke tilbyde lavere priser på andre platforme eller direkte til kunder, hvilket forhindrer dem i at indhente de høje provisionsomkostninger gennem direkte salg.<1/>", eng: "<strong>Price Parity Requirements:</strong> Restaurants can't offer lower prices on other platforms or directly to customers, preventing them from recovering the high commission costs through direct sales.<1/>" },
              item3: { dk: "<strong>Absorption af Omkostninger:</strong> Mange restauranter er nødt til enten at absorbere disse høje omkostninger (hvilket reducerer deres allerede tynde fortjenstmargener) eller hæve menupriserne på tværs af alle kanaler.", eng: "<strong>Absorption of Costs:</strong> Many restaurants have to either absorb these high costs (reducing their already thin profit margins) or raise menu prices across all channels." },
            },
            boycottTitle: { dk: "Restaurant Boykot", eng: "Restaurant Boycott" },
            boycottDesc: { dk: "Over 30 restauranter i Aalborg boykottede kollektivt Wolt i 2022<2/> i protest mod disse høje gebyrer og sagde, at de \"ikke kan få enderne til at mødes\", når Wolt tager så stor en andel af hvert salg.", eng: "Over 30 restaurants in Aalborg collectively boycotted Wolt in 2022<2/> in protest of these high fees, saying they \"can't make ends meet\" when Wolt takes such a high cut on every sale." },
            ownerQuote: { dk: "Én restaurantejer bemærkede, \"det er kun et spørgsmål om tid, før takeaway-butikker går nedenom og hjem\", hvis disse forhold fortsætter.<3/> Regnestykket går simpelthen ikke op for mange små virksomheder.", eng: "One restaurant owner noted, \"it's only a matter of time before takeaway shops go under\" if these conditions continue.<3/> The math simply doesn't work for many small businesses." },
            dependenceTrapTitle: { dk: "Afhængighedsfælden", eng: "The Dependence Trap" },
            dependenceTrapP1: { dk: "Wolts aggressive ekspansion har skabt en afhængighedsfælde for mange restauranter. Efterhånden som forbrugerne i stigende grad stoler på leveringsapps til at opdage og bestille mad, føler restauranter sig tvunget til at tilslutte sig platforme som Wolt på trods af de ufordelagtige vilkår.", eng: "Wolt's aggressive expansion has created a dependence trap for many restaurants. As consumers increasingly rely on delivery apps for discovering and ordering food, restaurants feel forced to join platforms like Wolt despite the disadvantageous terms." },
            dependenceTrapP2: { dk: "Denne dynamik skaber flere problemer:", eng: "This dynamic creates several issues:" },
            dependenceTrapList: {
              item1: { dk: "<strong>Markedsdominans:</strong> I København har Wolt næsten monopolmagt på leveringsmarkedet.<4/>", eng: "<strong>Market Dominance:</strong> In Copenhagen, Wolt has near-monopoly power in the delivery market.<4/>" },
              item2: { dk: "<strong>Kundekapring:</strong> Ét spisested i Aalborg rapporterede, at 90% af dets ordrer kom via Wolt,<5/> hvilket gjorde det næsten umuligt at forlade platformen.", eng: "<strong>Customer Capture:</strong> One Aalborg eatery reported that 90% of its orders came via Wolt,<5/> making it nearly impossible to leave the platform." },
              item3: { dk: "<strong>Ubalance i Forhandlingsstyrke:</strong> Denne dominans giver Wolt enorm forhandlingsstyrke til at diktere vilkår, herunder de hårde prisklausuler, der forhindrer restauranter i at tilbyde bedre priser direkte.", eng: "<strong>Leverage Imbalance:</strong> This dominance gives Wolt enormous leverage to dictate terms, including the harsh price clauses that prevent restaurants from offering better prices directly." },
            },
            dependenceTrapP3: { dk: "Mange små restauranter føler, at de \"hverken kan leve med Wolt eller uden Wolt\" – et klassisk scenarie for misbrug af monopol.<6/>", eng: "Many small restaurants feel they \"can't live with Wolt, but can't live without it\"—a classic abusive monopoly scenario.<6/>" },
            competitionImpactTitle: { dk: "Indvirkning på Konkurrencen", eng: "Impact on Competition" },
            competitionImpactP1: { dk: "Wolts markedsstyrke har endda hjulpet med at presse rivaler ud. Foodora (ejer af Hungry.dk) forsøgte at udfordre Wolt i Danmark ved at tilbyde lavere gebyrer og bedre service til restauranter, hvilket gav restauranter håb om et alternativ.<7/>", eng: "Wolt's market power has even helped push out rivals. Foodora (owner of Hungry.dk) tried to challenge Wolt in Denmark by offering lower fees and better service to restaurants, giving restaurants hope for an alternative.<7/>" },
            competitionImpactP2: { dk: "Men efter kun cirka 18 måneder trak Foodora sig ud af Danmark i 2024 med henvisning til det hårde marked domineret af Wolt. Med én konkurrent mindre bliver Wolts greb om restauranter – og dets evne til at opkræve høje gebyrer – kun stærkere.", eng: "But after only about 18 months, Foodora pulled out of Denmark in 2024, citing the tough market dominated by Wolt. With one less competitor, Wolt's grip on restaurants—and its ability to charge high fees—only grows stronger." },
            restaurantMathTitle: { dk: "Restaurantens Regnestykke", eng: "The Restaurant Math" },
            restaurantMathDesc: { dk: "For et typisk måltid til 15 €:", eng: "For a typical €15 meal:" },
            restaurantMathList: {
              item1: { dk: "4,50 € (30%) går til Wolt", eng: "€4.50 (30%) goes to Wolt" },
              item2: { dk: "6,00-7,50 € går til madomkostninger", eng: "€6.00-7.50 goes to food costs" },
              item3: { dk: "2,00-3,00 € går til personale og faste omkostninger", eng: "€2.00-3.00 goes to staff and overhead" },
              item4: { dk: "0,00-2,50 € tilbage som fortjeneste (ofte negativ)", eng: "€0.00-2.50 left as profit (often negative)" },
            },
            localAlternativesTitle: { dk: "Støt Lokale Alternativer", eng: "Supporting Local Alternatives" },
            localAlternativesDesc: { dk: "Der er bedre måder at støtte dine lokale restauranter på:", eng: "There are better ways to support your local restaurants:" },
            localAlternativesList: {
              item1: { dk: "<strong>Just Eat:</strong> Forbliver et levedygtigt alternativ, da det allerede arbejder sammen med et stort antal danske restauranter og ofte tillader \"egen kurér\" eller afhentning, hvilket undgår ekstreme provisioner.", eng: "<strong>Just Eat:</strong> Remains a viable alternative, as it already works with a huge number of Danish restaurants and often allows \"bring-your-own courier\" or pickup, which avoids extreme commissions." },
              item2: { dk: "<strong>Bestil Direkte:</strong> Det bedste alternativ er at bestille direkte fra restauranten (via telefon eller deres hjemmeside) og afhente din mad eller bruge deres egen levering, hvis det tilbydes. På denne måde beholder restauranten 100% af betalingen.", eng: "<strong>Order Direct:</strong> The best alternative is to order directly from the restaurant (by phone or their website) and pick up your food or use their in-house delivery if offered. This way, the restaurant keeps 100% of the payment." },
              item3: { dk: "<strong>Lokale Initiativer:</strong> Nogle danske kommuner og kooperativer undersøger lokale leveringsplatforme for at bryde grebet fra apps som Wolt.", eng: "<strong>Local Initiatives:</strong> Some Danish municipalities and cooperatives are exploring local delivery platforms to break the stranglehold of apps like Wolt." },
            },
            directOrderingImpactTitle: { dk: "Effekten af Direkte Bestilling", eng: "The Impact of Direct Ordering" },
            directOrderingImpactQuote: { dk: "\"Når kunder bestiller direkte fra os, har vi råd til at tilbyde bedre priser, betale vores personale bedre lønninger og forblive i drift. Hver direkte ordre hjælper os med at overleve.\" – Restaurantejer, København", eng: "\"When customers order directly from us, we can afford to offer better prices, pay our staff better wages, and stay in business. Every direct order helps us survive.\" — Restaurant owner, Copenhagen" },
            directOrderingNote: { dk: "Husk: Hver gang du undgår Wolts gebyrer, lægger du de penge tilbage i dit lokalsamfund og i arbejdernes lommer, ikke i en tech-platforms kasse.", eng: "Remember: every time you avoid Wolt's fees, you're putting that money back into your local community and workers' pockets, not a tech platform's coffers." },
            supportLocalTitle: { dk: "Støt Dine Lokale Restauranter", eng: "Support Your Local Restaurants" },
            supportLocalDesc: { dk: "Ved at bestille direkte eller bruge mere fair leveringsmuligheder hjælper du lokale restauranter med at trives og holder penge i dit lokalsamfund.", eng: "By ordering directly or using fairer delivery options, you help local restaurants thrive and keep money in your community." },
            supportLocalBtnDirect: { dk: "Find Direkte Bestillingsmuligheder", eng: "Find Direct Ordering Options" },
            // Citations for Restaurants Page
            citations: {
              source1: { dk: "Restaurationsbranchens Brancheforening Rapport, 2023", eng: "Restaurant Association of Denmark Report, 2023" },
              source2: { dk: "Konkurrenceanalyse, Madleveringsmarkedet Danmark, 2023", eng: "Competition Analysis, Food Delivery Market Denmark, 2023" },
              source3: { dk: "Aalborg Restaurant Boykot, 2022", eng: "Aalborg Restaurant Boycott, 2022" }, // Repeated, ok
              source4: { dk: "Restaurantejer Interview, Dansk Fødevareindustri Magasin, 2023", eng: "Restaurant Owner Interview, Danish Food Industry Magazine, 2023" },
              source5: { dk: "Markedsandelsanalyse, Danske Leveringsapps, 2023", eng: "Market Share Analysis, Danish Delivery Apps, 2023" },
              source6: { dk: "Småvirksomheders Indvirkningsundersøgelse, Nordjylland, 2023", eng: "Small Business Impact Survey, Northern Jutland, 2023" },
              source7: { dk: "Økonomisk Analyse af Madleveringsmarkedet, Københavns Universitet, 2023", eng: "Economic Analysis of Food Delivery Market, University of Copenhagen, 2023" },
              source8: { dk: "Foodora Danmark Markedsindtrængningsanalyse, 2022", eng: "Foodora Denmark Market Entry Analysis, 2022" },
            }
          },
          // Alternatives Page Content
          alternatives: {
            hero: {
              title: { dk: "Find Bedre Alternativer", eng: "Find Better Alternatives" },
              subtitle: { dk: "Støt restauranter og arbejdere ved at vælge mere fair leveringsmuligheder", eng: "Support restaurants and workers by choosing fairer delivery options" }
            },
            finderTitle: { dk: "Restaurant Finder", eng: "Restaurant Finder" },
            finderDesc: { dk: "Indtast din by for at finde restauranter, der tilbyder direkte bestilling eller bruger mere fair leveringstjenester.", eng: "Enter your city to find restaurants that offer direct ordering or use more fair delivery services." },
            finderPlaceholder: { dk: "Indtast din by...", eng: "Enter your city..." },
            finderButton: { dk: "Søg", eng: "Search" },
            finderComingSoon: { dk: "Kommer snart: Integration med Just Eat API for at vise reelle restaurantmuligheder", eng: "Coming soon: Integration with Just Eat API to show actual restaurant options" },
            whyChooseTitle: { dk: "Hvorfor Vælge Alternativer?", eng: "Why Choose Alternatives?" },
            whyChooseRestaurantsTitle: { dk: "For Restauranter", eng: "For Restaurants" },
            whyChooseRestaurantsList: {
              item1: { dk: "Behold mere af dine penge med lavere provisionssatser", eng: "Keep more of your money with lower commission rates" },
              item2: { dk: "Direkte bestilling betyder, at 100% af omsætningen bliver hos restauranten", eng: "Direct ordering means 100% of revenue stays with the restaurant" },
              item3: { dk: "Mere fleksible prismuligheder uden prisparitetsklausuler", eng: "More flexible pricing options without price parity clauses" },
              item4: { dk: "Bedre kontrol over kunderelationer og oplevelse", eng: "Better control over customer relationship and experience" },
            },
            whyChooseWorkersTitle: { dk: "For Arbejdere", eng: "For Workers" },
            whyChooseWorkersList: {
              item1: { dk: "Just Eat har underskrevet en overenskomst med 3F", eng: "Just Eat has signed a union agreement with 3F" },
              item2: { dk: "Bedre arbejdsforhold og beskyttelse", eng: "Better working conditions and protections" },
              item3: { dk: "Restaurantansatte har ofte mere stabil beskæftigelse", eng: "Restaurant employees often have more stable employment" },
              item4: { dk: "Støt den danske model for fair arbejdspraksis", eng: "Support the Danish model of fair labor practices" },
            },
            directOrderingTitle: { dk: "Måder at Bestille Direkte På", eng: "Ways to Order Directly" },
            directOrderingDesc: { dk: "Her er flere måder, du kan bestille direkte fra restauranter og støtte dine lokale virksomheder:", eng: "Here are several ways you can order directly from restaurants and support your local businesses:" },
            directOrderingMethods: {
              websitesTitle: { dk: "Restaurant Hjemmesider", eng: "Restaurant Websites" },
              websitesDesc: { dk: "Mange restauranter har deres egne online bestillingssystemer. Tjek restaurantens hjemmeside først for at se, om du kan bestille direkte.", eng: "Many restaurants have their own online ordering systems. Check the restaurant's website first to see if you can order directly." },
              phoneTitle: { dk: "Telefonbestillinger", eng: "Phone Orders" },
              phoneDesc: { dk: "Et simpelt telefonopkald for at afgive din ordre hjælper restauranter med helt at undgå provisionsgebyrer og giver et personligt præg.", eng: "A simple phone call to place your order helps restaurants avoid commission fees completely and provides a personal touch." },
              pickupTitle: { dk: "Afhentningsmuligheder", eng: "Pickup Options" },
              pickupDesc: { dk: "Hvis du har mulighed for at hente din ordre, er dette den mest omkostningseffektive mulighed for både dig og restauranten.", eng: "If you're able to pick up your order, this is the most cost-effective option for both you and the restaurant." },
            },
            joinMovementTitle: { dk: "Deltag i Bevægelsen", eng: "Join the Movement" },
            joinMovementDesc: { dk: "Hver ordre placeret gennem mere fair alternativer sender et budskab om, at danske forbrugere værdsætter etisk forretningspraksis.", eng: "Every order placed through fairer alternatives sends a message that Danish consumers value ethical business practices." }
          },
          // Pledge Page Content
          pledge: {
            hero: {
              title: { dk: "Skriv under på Løftet", eng: "Sign the Pledge" },
              titleSuccess: { dk: "Tak!", eng: "Thank You!" },
              subtitle: { dk: "Deltag i bevægelsen mod Wolts urimelige praksis", eng: "Join the movement against Wolt's unfair practices" },
              subtitleSuccess: { dk: "Vi har sendt en bekræftelsesmail. Tjek din indbakke!", eng: "We've sent a verification email. Check your inbox!" }
            },
            whyPledgeTitle: { dk: "Hvorfor Dit Løfte Betyder Noget", eng: "Why Your Pledge Matters" },
            whyPledgeDesc: { dk: "Ved at underskrive dette løfte tager du stilling mod Wolts forretningspraksis, der:", eng: "By signing this pledge, you're taking a stand against Wolt's business practices that:" },
            whyPledgeList: {
              item1: { dk: "Opkræver restauranter op til 30% i provision, hvilket presser deres allerede tynde marginer", eng: "Charge restaurants up to 30% commissions, squeezing their already thin margins" },
              item2: { dk: "Tilføjer skjulte \"servicegebyrer\" til kunder, mens de stadig opkræver for levering", eng: "Add hidden \"service fees\" to customers while still charging for delivery" },
              item3: { dk: "Behandler arbejdere som kontraktører, hvilket nægter dem ansættelsesfordele", eng: "Treat workers as contractors, denying them employment benefits" },
              item4: { dk: "Skaber et monopolistisk marked, der skader lokale virksomheder", eng: "Create a monopolistic market that hurts local businesses" },
            },
            pledgeImpactTitle: { dk: "Dit løfte vil:", eng: "Your pledge will:" },
            pledgeImpactList: {
              item1: { dk: "Blive talt med i vores offentlige opgørelse over Wolt-modstandere", eng: "Be counted in our public tally of Wolt resisters" },
              item2: { dk: "Hjælpe med at demonstrere forbrugernes efterspørgsel efter mere fair forretningspraksis", eng: "Help demonstrate consumer demand for fairer business practices" },
              item3: { dk: "Tilføje styrke til vores bevægelse for et mere etisk madleveringsøkosystem", eng: "Add strength to our movement for a more ethical food delivery ecosystem" },
            },
            privacyNote: { dk: "<strong>Privatlivsbemærkning:</strong> Din e-mailadresse vil kun blive brugt til at bekræfte dit løfte og vil ikke blive delt med tredjeparter.", eng: "<strong>Privacy note:</strong> Your email address will only be used to verify your pledge and will not be shared with third parties." },
            formTitle: { dk: "Skriv under på Løftet", eng: "Sign the Pledge" }, // Reused from hero
            formNameLabel: { dk: "Navn", eng: "Name" },
            formNamePlaceholder: { dk: "Dit navn", eng: "Your name" },
            formEmailLabel: { dk: "Email", eng: "Email" },
            formEmailPlaceholder: { dk: "Din emailadresse", eng: "Your email address" },
            formCommentLabel: { dk: "Kommentar (valgfri)", eng: "Comment (optional)" },
            formCommentPlaceholder: { dk: "Hvorfor skriver du under?", eng: "Why are you signing this pledge?" },
            successMessage: { dk: "Dit løfte er indsendt!", eng: "Your pledge has been submitted!" },
            successVerification: { dk: "Tjek venligst din email for et bekræftelseslink for at bekræfte dit løfte.", eng: "Please check your email for a verification link to confirm your pledge." },
            successSpam: { dk: "Hvis du ikke ser den, så tjek din spam-mappe. Bekræftelsesmailen er påkrævet for at tælle dit løfte.", eng: "If you don't see it, check your spam folder. The verification email is required to count your pledge." },
            successDevLink: { dk: "Udviklingstilstand: Brug dette link til at bekræfte dit løfte:", eng: "Development mode: Use this link to verify your pledge:" },
            whatsNextTitle: { dk: "Hvad Nu?", eng: "What's Next?" },
            whatsNextDesc: { dk: "Mens du venter på bekræftelsesmailen, kan du udforske nogle alternativer til Wolt eller lære mere om, hvorfor denne bevægelse betyder noget:", eng: "While waiting for the verification email, explore some alternatives to Wolt or learn why this movement matters:" },
            errorMessages: {
              default: { dk: "Der opstod en fejl. Prøv venligst igen.", eng: "An error occurred. Please try again." },
              emailExists: { dk: "Denne email har allerede underskrevet et verificeret løfte.", eng: "This email has already verified a pledge." },
              invalidEmail: { dk: "Ugyldigt email format.", eng: "Invalid email format." },
              requiredFields: { dk: "Navn og email er påkrævet.", eng: "Name and email are required." }
            }
          },
          // Verify Page Content
          verify: {
            heroLoading: {
              title: { dk: "Bekræfter Løfte...", eng: "Verifying Pledge..." },
              subtitle: { dk: "Vent venligst, mens vi bekræfter dit løfte...", eng: "Please wait while we verify your pledge..." }
            },
            heroSuccess: {
              title: { dk: "Tak!", eng: "Thank You!" },
              subtitle: { dk: "Dit løfte mod Wolt er blevet bekræftet", eng: "Your pledge against Wolt has been verified" }
            },
            heroError: {
              title: { dk: "Bekræftelse Mislykkedes", eng: "Verification Failed" },
              subtitle: { dk: "Vi stødte på et problem med at bekræfte dit løfte", eng: "We encountered an issue verifying your pledge" }
            },
            statusLoading: { dk: "Bekræfter dit løfte...", eng: "Verifying your pledge..." },
            statusSuccess: { dk: "Dit løfte er blevet verificeret!", eng: "Your pledge has been verified successfully!" },
            statusError: { dk: "Kunne ikke bekræfte dit løfte. Linket er muligvis ugyldigt eller udløbet.", eng: "Failed to verify your pledge. The link may be invalid or expired." },
            noTokenError: { dk: "Intet bekræftelsestoken angivet. Tjek venligst linket i din email.", eng: "No verification token provided. Please check your email link." },
            successCountPart1: { dk: "Du har sluttet dig til", eng: "You've joined" },
            successCountPart2: { dk: "verificerede løfter mod Wolts urimelige praksis", eng: "verified pledges against Wolt's unfair practices" },
            successThankYou: { dk: "Tak fordi du står sammen med os mod Wolts urimelige forretningspraksis. Sammen kan vi gøre en forskel for restauranter, arbejdere og forbrugere.", eng: "Thank you for standing with us against Wolt's unfair business practices. Together, we can make a difference for restaurants, workers, and consumers." },
            errorInstruction: { dk: "Hvis du mener, dette er en fejl, prøv venligst at klikke på linket i din email igen eller kontakt os for hjælp.", eng: "If you believe this is an error, please try clicking the link in your email again or contact us for assistance." }
          },
          // Contact Page Content
          contact: {
            hero: {
              title: { dk: "Kontakt Os", eng: "Contact Us" },
              subtitle: { dk: "Har du spørgsmål eller ønsker du at blive involveret? Kontakt os.", eng: "Have questions or want to get involved? Reach out to us." }
            },
            formTitle: { dk: "Kontakt Os", eng: "Get in Touch" }, // Reused
            formNameLabel: { dk: "Navn", eng: "Name" },
            formEmailLabel: { dk: "Email", eng: "Email" },
            formSubjectLabel: { dk: "Emne", eng: "Subject" },
            formSubjectOptions: {
              general: { dk: "Generel Forespørgsel", eng: "General Inquiry" },
              media: { dk: "Mediehenvendelse", eng: "Media Request" },
              partnership: { dk: "Partnerskabsmulighed", eng: "Partnership Opportunity" },
              story: { dk: "Del Min Historie", eng: "Share My Story" },
              technical: { dk: "Teknisk Problem", eng: "Technical Issue" },
            },
            formMessageLabel: { dk: "Besked", eng: "Message" },
            formButton: { dk: "Send Besked", eng: "Send Message" },
            formSubmitting: { dk: "Sender...", eng: "Sending..." },
            successTitle: { dk: "Besked Sendt", eng: "Message Sent" },
            successMessage: { dk: "Tak for din besked! Vi vender tilbage til dig snarest.", eng: "Thank you for your message! We will get back to you soon." },
            successButton: { dk: "Send Endnu En Besked", eng: "Send Another Message" },
            mediaTitle: { dk: "For Mediehenvendelser", eng: "For Media Inquiries" },
            mediaDesc: { dk: "Vi byder mediedækning af Cancel Wolt-bevægelsen velkommen. Vores team kan levere:", eng: "We welcome media coverage of the Cancel Wolt movement. Our team can provide:" },
            mediaList: {
              item1: { dk: "Statistikker og data om Wolts markedspraksis", eng: "Statistics and data on Wolt's market practices" },
              item2: { dk: "Interviews med restaurantejere påvirket af høje provisionssatser", eng: "Interviews with restaurant owners affected by high commission rates" },
              item3: { dk: "Historier fra leveringsbude om deres arbejdsvilkår", eng: "Stories from delivery workers about their working conditions" },
              item4: { dk: "Ekspertkommentarer om gig-økonomien og madleveringsmarkedet", eng: "Expert commentary on the gig economy and food delivery market" },
            },
            mediaContact: { dk: "For presserende mediehenvendelser, send venligst en email til <0>media@cancelwolt.dk</0> eller vælg \"Mediehenvendelse\" i kontaktformularen ovenfor.", eng: "For urgent media requests, please email <0>media@cancelwolt.dk</0> or select \"Media Request\" in the contact form above." },
            partnershipTitle: { dk: "Partnerskabsmuligheder", eng: "Partnership Opportunities" },
            partnershipDesc: { dk: "Vi søger partnerskab med:", eng: "We're looking to partner with:" },
            partnershipItems: {
              associationsTitle: { dk: "Restaurantforeninger", eng: "Restaurant Associations" },
              associationsDesc: { dk: "Slut jer til vores koalition for at advokere for fair provisionssatser og gennemsigtige praksisser inden for madlevering.", eng: "Join our coalition to advocate for fair commission rates and transparent practices in food delivery." },
              unionsTitle: { dk: "Fagforeninger", eng: "Labor Unions" },
              unionsDesc: { dk: "Samarbejd med os for at støtte bedre arbejdsvilkår og beskyttelse for leveringsarbejdere.", eng: "Partner with us to support better working conditions and protections for delivery workers." },
              consumerOrgsTitle: { dk: "Forbrugerorganisationer", eng: "Consumer Organizations" },
              consumerOrgsDesc: { dk: "Samarbejd om oplysningskampagner om skjulte gebyrer og fair alternativer inden for madlevering.", eng: "Collaborate on education campaigns about hidden fees and fair alternatives in food delivery." },
              localBizTitle: { dk: "Lokale Virksomheder", eng: "Local Businesses" },
              localBizDesc: { dk: "Fremvis din restaurant som et \"direkte bestilling\" alternativ og del din Wolt-oplevelse.", eng: "Showcase your restaurant as a \"direct ordering\" alternative and share your Wolt experience." },
            },
            partnershipContact: { dk: "For at diskutere partnerskabsmuligheder, vælg venligst \"Partnerskabsmulighed\" i kontaktformularen ovenfor.", eng: "To discuss partnership opportunities, please select \"Partnership Opportunity\" in the contact form above." },
            faqTitle: { dk: "Ofte Stillede Spørgsmål", eng: "Frequently Asked Questions" },
            faqItems: {
              q1: { dk: "Er denne kampagne tilknyttet nogen konkurrenter?", eng: "Is this campaign affiliated with any competitors?" },
              a1: { dk: "Nej, vi er en uafhængig græsrodsbevægelse af bekymrede forbrugere, restaurantejere og leveringsarbejdere. Vi modtager ingen finansiering fra konkurrenter som Just Eat eller andre.", eng: "No, we are an independent, grassroots movement of concerned consumers, restaurant owners, and delivery workers. We receive no funding from competitors like Just Eat or others." },
              q2: { dk: "Hvordan kan jeg bidrage udover at underskrive løftet?", eng: "How can I contribute beyond signing the pledge?" },
              a2: { dk: "Du kan hjælpe ved at sprede ordet, dele dine erfaringer, tilbyde dine færdigheder frivilligt (design, udvikling, skrivning) eller donere for at hjælpe med at dække vores minimale driftsomkostninger.", eng: "You can help by spreading the word, sharing your experiences, volunteering your skills (design, development, writing), or donating to help cover our minimal operating costs." },
              q3: { dk: "Hvordan bruger I de data, der indsamles i løftet?", eng: "How do you use the data collected in the pledge?" },
              a3: { dk: "Vi bruger kun dine oplysninger til at tælle underskrifter og sende dig lejlighedsvise opdateringer om bevægelsen. Vi sælger eller deler aldrig dine personlige data med tredjeparter. Se vores Privatlivspolitik for detaljer.", eng: "We only use your information to count pledge signatures and to send you occasional updates about the movement. We never sell or share your personal data with third parties. See our Privacy Policy for details." },
              q4: { dk: "Jeg er restaurantejer og vil gerne dele min historie. Hvordan gør jeg det?", eng: "I'm a restaurant owner who wants to share my story. How can I do that?" },
              a4: { dk: "Vi vil meget gerne høre fra dig! Vælg venligst \"Del Min Historie\" i kontaktformularen ovenfor, og en fra vores team vil følge op for at arrangere et interview.", eng: "We'd love to hear from you! Please select \"Share My Story\" in the contact form above, and someone from our team will follow up to arrange an interview." },
            }
          },
          // Privacy Page Content
          privacy: {
            hero: {
              title: { dk: "Privatlivspolitik", eng: "Privacy Policy" },
              subtitle: { dk: "Hvordan vi indsamler, bruger og beskytter dine oplysninger", eng: "How we collect, use, and protect your information" }
            },
            overviewTitle: { dk: "Oversigt", eng: "Overview" },
            overviewP1: { dk: "Denne Privatlivspolitik forklarer, hvordan Cancel Wolt (\"vi\", \"os\" eller \"vores\") indsamler, bruger og deler dine personlige oplysninger via vores hjemmeside cancelwolt.dk. Vi er forpligtet til at beskytte dit privatliv og håndtere dine data på en åben og gennemsigtig måde.", eng: "This Privacy Policy explains how Cancel Wolt (\"we\", \"us\", or \"our\") collects, uses, and shares your personal information through our website cancelwolt.dk. We are committed to protecting your privacy and handling your data in an open and transparent manner." },
            overviewP2: { dk: "Denne politik blev sidst opdateret den 1. juni 2024 og overholder den Generelle Databeskyttelsesforordning (GDPR).", eng: "This policy was last updated on June 1, 2024 and complies with the General Data Protection Regulation (GDPR)." },
            whatInfoTitle: { dk: "Hvilke Oplysninger Indsamler Vi", eng: "What Information We Collect" },
            whatInfoDesc: { dk: "Vi indsamler følgende typer oplysninger:", eng: "We collect the following types of information:" },
            whatInfoProvidedTitle: { dk: "Oplysninger Du Giver Os", eng: "Information You Provide to Us" },
            whatInfoProvidedList: {
              item1: { dk: "<strong>Løfteformular:</strong> Når du underskriver vores løfte, indsamler vi dit navn, emailadresse, by (valgfrit) og eventuelle kommentarer, du giver om, hvorfor du deltager i bevægelsen.", eng: "<strong>Pledge Form:</strong> When you sign our pledge, we collect your name, email address, city (optional), and any comments you provide about why you're joining the movement." },
              item2: { dk: "<strong>Kontaktformular:</strong> Når du kontakter os, indsamler vi dit navn, emailadresse, emnet for din henvendelse og din besked.", eng: "<strong>Contact Form:</strong> When you contact us, we collect your name, email address, the subject of your inquiry, and your message." },
            },
            whatInfoAutoTitle: { dk: "Oplysninger Vi Indsamler Automatisk", eng: "Information We Collect Automatically" },
            whatInfoAutoList: {
              item1: { dk: "<strong>Brugsdata:</strong> Vi bruger Plausible Analytics, et privatlivsvenligt analyseværktøj, der indsamler anonyme brugsstatistikker. Dette inkluderer sidevisninger, henvisningskilder og browseroplysninger, men bruger ikke cookies eller indsamler personlige data.", eng: "<strong>Usage Data:</strong> We use Plausible Analytics, a privacy-friendly analytics tool that collects anonymous usage statistics. This includes page views, referral sources, and browser information, but does not use cookies or collect personal data." },
            },
            howUseTitle: { dk: "Hvordan Vi Bruger Dine Oplysninger", eng: "How We Use Your Information" },
            howUseDesc: { dk: "Vi bruger de oplysninger, vi indsamler, til følgende formål:", eng: "We use the information we collect for the following purposes:" },
            howUseList: {
              item1: { dk: "<strong>At Behandle Dit Løfte:</strong> Vi bruger dit navn og email til at registrere dit løfte og sende dig en bekræftelsesmail.", eng: "<strong>To Process Your Pledge:</strong> We use your name and email to register your pledge and send you a confirmation email." },
              item2: { dk: "<strong>At Kommunikere Med Dig:</strong> Vi bruger dine kontaktoplysninger til at besvare dine henvendelser og sende lejlighedsvise opdateringer om bevægelsen (du kan til enhver tid afmelde dig disse).", eng: "<strong>To Communicate With You:</strong> We use your contact information to respond to your inquiries and send occasional updates about the movement (you can opt out of these at any time)." },
              item3: { dk: "<strong>At Forbedre Vores Hjemmeside:</strong> Vi bruger anonyme brugsdata til at forstå, hvordan besøgende interagerer med vores site og foretage forbedringer.", eng: "<strong>To Improve Our Website:</strong> We use anonymous usage data to understand how visitors interact with our site and make improvements." },
              item4: { dk: "<strong>At Tælle Løfter:</strong> Vi bruger anonyme optællinger af løfter til at vise det samlede antal støtter på vores hjemmeside.", eng: "<strong>To Count Pledges:</strong> We use anonymous counts of pledges to display the total number of supporters on our website." },
            },
            legalBasisTitle: { dk: "Retsgrundlag for Behandling:", eng: "Legal Basis for Processing:" },
            legalBasisDesc: { dk: "Vi behandler dine data baseret på følgende retsgrundlag:", eng: "We process your data based on the following legal grounds:" },
            legalBasisList: {
              item1: { dk: "Dit samtykke (som du til enhver tid kan trække tilbage)", eng: "Your consent (which you can withdraw at any time)" },
              item2: { dk: "De legitime interesser for vores bevægelse (såsom at forbedre vores hjemmeside)", eng: "The legitimate interests of our movement (such as improving our website)" },
              item3: { dk: "At opfylde vores kontraktlige forpligtelser over for dig, når du underskriver løftet", eng: "To fulfill our contractual obligations to you when you sign the pledge" },
            },
            howShareTitle: { dk: "Hvordan Vi Deler Dine Oplysninger", eng: "How We Share Your Information" },
            howShareDesc: { dk: "Vi sælger, udlejer eller bytter ikke dine personlige oplysninger til tredjeparter. Vi kan dele dine oplysninger under følgende begrænsede omstændigheder:", eng: "We do not sell, rent, or trade your personal information to third parties. We may share your information in the following limited circumstances:" },
            howShareList: {
              item1: { dk: "<strong>Tjenesteudbydere:</strong> Vi bruger Supabase til at gemme løfte- og kontaktformulardata. Disse udbydere er kontraktligt forpligtet til at beskytte dine data og kun behandle dem i henhold til vores instruktioner.", eng: "<strong>Service Providers:</strong> We use Supabase to store pledge and contact form data. These providers are contractually bound to protect your data and only process it according to our instructions." },
              item2: { dk: "<strong>Aggregerede Statistikker:</strong> Vi kan videregive anonymiserede, aggregerede statistikker om antallet af løfter og deres geografiske fordeling.", eng: "<strong>Aggregated Statistics:</strong> We may disclose anonymized, aggregated statistics about the number of pledges and their geographic distribution." },
              item3: { dk: "<strong>Lovkrav:</strong> Vi kan videregive dine oplysninger, hvis det kræves ved lov, f.eks. som svar på en retskendelse eller juridisk proces.", eng: "<strong>Legal Requirements:</strong> We may disclose your information if required by law, such as in response to a court order or legal process." },
            },
            retentionSecurityTitle: { dk: "Opbevaring og Sikkerhed af Data", eng: "Data Retention and Security" },
            retentionTitle: { dk: "Hvor Længe Vi Opbevarer Dine Data", eng: "How Long We Keep Your Data" },
            retentionDesc: { dk: "Vi opbevarer dine personoplysninger, så længe det er nødvendigt for at opfylde de formål, hvortil de blev indsamlet, eller som krævet af gældende love. Specifikt:", eng: "We retain your personal data for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable laws. Specifically:" },
            retentionList: {
              item1: { dk: "Løftedata: Opbevares i løbet af Cancel Wolt-kampagnen", eng: "Pledge data: Retained for the duration of the Cancel Wolt campaign" },
              item2: { dk: "Kontaktformularindsendelser: Opbevares i op til 1 år efter løsning", eng: "Contact form submissions: Retained for up to 1 year after resolution" },
            },
            securityTitle: { dk: "Hvordan Vi Beskytter Dine Data", eng: "How We Protect Your Data" },
            securityDesc: { dk: "Vi implementerer passende tekniske og organisatoriske foranstaltninger for at beskytte dine personoplysninger mod uautoriseret eller ulovlig behandling, utilsigtet tab, ødelæggelse eller beskadigelse. Disse inkluderer:", eng: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. These include:" },
            securityList: {
              item1: { dk: "Sikker hosting på Vercels infrastruktur", eng: "Secure hosting on Vercel's infrastructure" },
              item2: { dk: "Kryptering af data under transit ved hjælp af HTTPS", eng: "Encryption of data in transit using HTTPS" },
              item3: { dk: "Adgangskontrol for at begrænse, hvem der kan få adgang til dine data", eng: "Access controls to limit who can access your data" },
              item4: { dk: "Regelmæssige sikkerhedsgennemgange og opdateringer", eng: "Regular security reviews and updates" },
            },
            rightsTitle: { dk: "Dine Privatlivsrettigheder", eng: "Your Privacy Rights" },
            rightsDesc: { dk: "Under GDPR har du følgende rettigheder vedrørende dine personoplysninger:", eng: "Under the GDPR, you have the following rights regarding your personal data:" },
            rightsList: {
              item1: { dk: "<strong>Ret til Indsigt:</strong> Du kan anmode om en kopi af de personoplysninger, vi har om dig.", eng: "<strong>Right to Access:</strong> You can request a copy of the personal data we hold about you." },
              item2: { dk: "<strong>Ret til Berigtigelse:</strong> Du kan bede os om at rette unøjagtige eller ufuldstændige oplysninger.", eng: "<strong>Right to Rectification:</strong> You can ask us to correct inaccurate or incomplete information." },
              item3: { dk: "<strong>Ret til Sletning:</strong> Du kan bede os om at slette dine personoplysninger under visse omstændigheder.", eng: "<strong>Right to Erasure:</strong> You can ask us to delete your personal data in certain circumstances." },
              item4: { dk: "<strong>Ret til Begrænsning af Behandling:</strong> Du kan bede os om at begrænse, hvordan vi bruger dine data.", eng: "<strong>Right to Restrict Processing:</strong> You can ask us to limit how we use your data." },
              item5: { dk: "<strong>Ret til Dataportabilitet:</strong> Du kan bede om en kopi af dine data i et maskinlæsbart format.", eng: "<strong>Right to Data Portability:</strong> You can ask for a copy of your data in a machine-readable format." },
              item6: { dk: "<strong>Ret til Indsigelse:</strong> Du kan gøre indsigelse mod vores behandling af dine data til visse formål.", eng: "<strong>Right to Object:</strong> You can object to our processing of your data for certain purposes." },
              item7: { dk: "<strong>Ret til at Trække Samtykke Tilbage:</strong> Du kan til enhver tid trække dit samtykke tilbage.", eng: "<strong>Right to Withdraw Consent:</strong> You can withdraw your consent at any time." },
            },
            rightsContact: { dk: "For at udøve nogen af disse rettigheder, kontakt os venligst på <0>privacy@cancelwolt.dk</0>. Vi vil besvare din anmodning inden for 30 dage.", eng: "To exercise any of these rights, please contact us at <0>privacy@cancelwolt.dk</0>. We will respond to your request within 30 days." },
            cookiesTitle: { dk: "Cookies og Lignende Teknologier", eng: "Cookies and Similar Technologies" },
            cookiesP1: { dk: "Vores hjemmeside bruger minimale cookies, der er nødvendige for, at hjemmesiden fungerer korrekt. Vi bruger ikke cookies til reklame- eller sporingsformål.", eng: "Our website uses minimal cookies that are necessary for the website to function properly. We do not use cookies for advertising or tracking purposes." },
            cookiesP2: { dk: "Det analyseværktøj, vi bruger (Plausible), er cookie-frit og sporer ikke enkeltpersoner på tværs af hjemmesider eller enheder.", eng: "The analytics tool we use (Plausible) is cookie-free and does not track individuals across websites or devices." },
            cookiesP3: { dk: "Du kan kontrollere cookies via dine browserindstillinger. Bemærk venligst, at blokering af essentielle cookies kan påvirke funktionaliteten af vores hjemmeside.", eng: "You can control cookies through your browser settings. Please note that blocking essential cookies may affect the functionality of our website." },
            changesTitle: { dk: "Ændringer til Denne Politik", eng: "Changes to This Policy" },
            changesP1: { dk: "Vi kan opdatere denne Privatlivspolitik fra tid til anden. Vi vil underrette dig om eventuelle ændringer ved at offentliggøre den nye politik på denne side og opdatere \"sidst opdateret\"-datoen.", eng: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"last updated\" date." },
            changesP2: { dk: "Vi opfordrer dig til at gennemgå denne politik med jævne mellemrum for at holde dig informeret om, hvordan vi beskytter dine personoplysninger.", eng: "We encourage you to review this policy periodically to stay informed about how we protect your personal information." },
            contactTitle: { dk: "Kontakt Os", eng: "Contact Us" }, // Reused
            contactDesc: { dk: "Hvis du har spørgsmål om denne Privatlivspolitik eller vores datapraksis, bedes du kontakte os på:", eng: "If you have any questions about this Privacy Policy or our data practices, please contact us at:" },
            contactEmail: { dk: "Email: <0>privacy@cancelwolt.dk</0>", eng: "Email: <0>privacy@cancelwolt.dk</0>" },
            contactComplaint: { dk: "Du har også ret til at indgive en klage til Datatilsynet, hvis du mener, at behandlingen af dine personoplysninger overtræder gældende love.", eng: "You also have the right to lodge a complaint with the Danish Data Protection Agency (Datatilsynet) if you believe that the processing of your personal data violates applicable laws." },
          },
          // Add other pages (Success Stories, Merchant Example) if needed
        };
        ```
*   `[ ]` **Remove Old Translations:** Delete the existing simpler key-value pairs from the `translations` object in `contexts/language-context.tsx` (like `home`, `products`, `solutions`, etc.) unless they are still needed for parts of the UI not covered by the new comprehensive structure. Keep the theme/language toggles keys (`language`, `theme`, `light`, `dark`).

---

### Phase 3: Page Creation & Basic Content Integration

*   `[ ]` **Create Page Files:**
    *   Ensure the following page files exist within the `app` directory structure. Create them if they don't, using the standard Next.js App Router convention (`page.tsx`):
        *   `app/page.tsx` (Homepage - Already exists)
        *   `app/about/page.tsx`
        *   `app/pricing/page.tsx`
        *   `app/workers/page.tsx`
        *   `app/restaurants/page.tsx`
        *   `app/alternatives/page.tsx`
        *   `app/pledge/page.tsx`
        *   `app/contact/page.tsx`
        *   `app/privacy/page.tsx`
        *   `app/verify/page.tsx`
        *   *(Optional: `app/success-stories/page.tsx` - Create if content exists)*
        *   *(Optional: `app/merchant-example/page.tsx` - Create if needed as a demo)*
*   `[ ]` **Implement Homepage (`app/page.tsx`):**
    *   Import `PageHero`, `ContentSection`, `Citation`, `InfoCardGrid`, `Link`, `WoltButton`, `useLanguage`.
    *   Get `t` function: `const { t } = useLanguage();`
    *   Render `<PageHero title={t('home.hero.title')} subtitle={t('home.hero.subtitle')} color="primary" />`
    *   Render a section for "Why Cancel Wolt?" using `<ContentSection>` (or just a standard section). Include `<h2>{t('home.whyCancelTitle')}</h2>` and `<p>{t('home.whyCancelDesc')}</p>`.
    *   Render `<InfoCardGrid cards={...} />` using data mapped from `t('home.card.*')` keys (e.g., `t('home.card.hiddenCosts.title')`, etc.) with corresponding images (e.g., `/images/hidden_cost.png`) and links (`/pricing`, etc.). Use the first 3-6 relevant cards.
    *   Render `<ContentSection title={t('home.hiddenCostsTitle')} bgColor="light">`. Add paragraphs using `t('home.hiddenCostsP1')` and `t('home.hiddenCostsP2')`. Integrate citations using `<Citation id="1" source={t('home.citations.source1')}/>` etc. (adjust IDs). Add a `<WoltButton>` linking to `/pledge`.
    *   Render `<ContentSection title={t('home.alternativesTitle')} bgColor="white">`. Add description `t('home.alternativesDesc')` and list `t('home.alternativesList.item1')` etc. Add buttons linking to `/alternatives` and maybe `/merchant-example`.
    *   Render final CTA section (e.g., `<section className="py-16 bg-wolt-blue text-white">`) with `<h2>{t('home.joinMovementTitle')}</h2>`, `<p>{t('home.joinMovementDesc')}</p>`, and a button linking to `/pledge`.
*   `[ ]` **Implement About Page (`app/about/page.tsx`):**
    *   Import necessary components. Get `t` function.
    *   Render `<PageHero title={t('about.hero.title')} subtitle={t('about.hero.subtitle')} color="secondary" />`
    *   Render `<ContentSection title={t('about.missionTitle')} bgColor="white">`. Include paragraphs `t('about.missionP1')`, `t('about.missionP2')`, list `t('about.missionList.*')`, paragraph `t('about.missionP3')`.
    *   Render `<ContentSection title={t('about.whyMattersTitle')} bgColor="light">`. Include paragraphs `t('about.whyMattersP1')`, `t('about.whyMattersP2')` (with citation), `t('about.whyMattersP3')`.
    *   Render `<ContentSection title={t('about.howToHelpTitle')} bgColor="white">`. Use divs or list for items, e.g., `<h3>{t('about.howToHelpItems.item1Title')}</h3><p>{t('about.howToHelpItems.item1Desc')}</p>`. Add buttons linking to `/pledge` and `/alternatives`.
*   `[ ]` **Implement Pricing Page (`app/pricing/page.tsx`):**
    *   Import necessary components. Get `t` function.
    *   Render `<PageHero title={t('pricing.hero.title')} subtitle={t('pricing.hero.subtitle')} color="primary" />`
    *   Render a section with `<h2>{t('pricing.realPriceTitle')}</h2>`. Add an `<InfoCardGrid>` using data mapped from `t('pricing.card.*')` keys (e.g., `hidden-fees`, `restaurant-commission`, `price-parity`).
    *   Render `<ContentSection title={t('pricing.hiddenFeesTitle')} bgColor="light">`. Include description `t('pricing.hiddenFeesDesc')`, list `t('pricing.hiddenFeesList.*')` (with citations), example block `t('pricing.exampleTitle')`, `t('pricing.exampleDesc')`, list `t('pricing.exampleList.*')`, and note `t('pricing.woltPlusNote')`.
    *   Render `<ContentSection title={t('pricing.comparisonTitle')} bgColor="white">`. Include description `t('pricing.comparisonDesc')`. Add `ComparisonTable` components here (details in Phase 4). Add note `t('pricing.priceDifferenceNote')`.
    *   Render `<ContentSection title={t('pricing.priceParityTitle')} bgColor="light">`. Include paragraphs `t('pricing.priceParityP1')`, `t('pricing.priceParityP2')` (with citations), highlight box `t('pricing.whatThisMeansTitle')`, `t('pricing.whatThisMeansDesc')`, and note `t('pricing.competitorNote')` (with citation).
    *   Render final CTA section linking to `/alternatives` and `/pledge`.
*   `[ ]` **Implement Workers Page (`app/workers/page.tsx`):**
    *   Import necessary components. Get `t` function.
    *   Render `<PageHero title={t('workers.hero.title')} subtitle={t('workers.hero.subtitle')} color="danger" />`
    *   Render `<ContentSection title={t('workers.noProtectionsTitle')} bgColor="white">`. Include paragraphs `t('workers.noProtectionsP1')`, `t('workers.noProtectionsP2')`, list1 `t('workers.noProtectionsList1.*')`, paragraph `t('workers.noProtectionsP3')`, list2 `t('workers.noProtectionsList2.*')`, paragraph `t('workers.noProtectionsP4')` (with citations).
    *   Render `<ContentSection title={t('workers.comparisonTitle')} bgColor="light">`. Include description `t('workers.comparisonDesc')`. Add `ComparisonTable` here (details in Phase 4). Add note `t('workers.comparisonNote')` (with citation).
    *   Render `<ContentSection title={t('workers.lowEarningsTitle')} bgColor="white">`. Include paragraphs `t('workers.lowEarningsP1')`, `t('workers.lowEarningsP2')`, list `t('workers.lowEarningsList.*')` (with citations), quote box `t('workers.realImpactTitle')`, `t('workers.realImpactQuote')`.
    *   Render `<ContentSection title={t('workers.safetyRisksTitle')} bgColor="light">`. Include paragraphs `t('workers.safetyRisksP1')`, `t('workers.safetyRisksP2')`, list `t('workers.safetyRisksList.*')`, paragraph `t('workers.safetyRisksP3')` (with citations).
    *   Render `<ContentSection title={t('workers.pushbackTitle')} bgColor="white">`. Include description `t('workers.pushbackDesc')`, list `t('workers.pushbackList.*')` (with citations), paragraph `t('workers.pushbackP2')`, info box `t('workers.competitorsBetterTitle')`, `t('workers.competitorsBetterP1')`, `t('workers.competitorsBetterP2')` (with citations).
    *   Render final CTA section linking to `/pledge` and `/alternatives`.
*   `[ ]` **Implement Restaurants Page (`app/restaurants/page.tsx`):**
    *   Import necessary components. Get `t` function.
    *   Render `<PageHero title={t('restaurants.hero.title')} subtitle={t('restaurants.hero.subtitle')} color="primary" />`
    *   Render `<ContentSection title={t('restaurants.commissionSqueezeTitle')} bgColor="white">`. Include paragraph `t('restaurants.commissionSqueezeP1')`, list `t('restaurants.commissionSqueezeList.*')` (with citations), boycott box `t('restaurants.boycottTitle')`, `t('restaurants.boycottDesc')`, quote `t('restaurants.ownerQuote')`.
    *   Render `<ContentSection title={t('restaurants.dependenceTrapTitle')} bgColor="light">`. Include paragraphs `t('restaurants.dependenceTrapP1')`, `t('restaurants.dependenceTrapP2')`, list `t('restaurants.dependenceTrapList.*')` (with citations), paragraph `t('restaurants.dependenceTrapP3')`.
    *   Render `<ContentSection title={t('restaurants.competitionImpactTitle')} bgColor="white">`. Include paragraphs `t('restaurants.competitionImpactP1')`, `t('restaurants.competitionImpactP2')` (with citations), math box `t('restaurants.restaurantMathTitle')`, `t('restaurants.restaurantMathDesc')`, list `t('restaurants.restaurantMathList.*')`.
    *   Render `<ContentSection title={t('restaurants.localAlternativesTitle')} bgColor="light">`. Include description `t('restaurants.localAlternativesDesc')`, list `t('restaurants.localAlternativesList.*')`, impact box `t('restaurants.directOrderingImpactTitle')`, `t('restaurants.directOrderingImpactQuote')`, note `t('restaurants.directOrderingNote')`.
    *   Render final CTA section linking to `/alternatives` and `/pledge`.
*   `[ ]` **Implement Alternatives Page (`app/alternatives/page.tsx`):**
    *   Import necessary components. Get `t` function.
    *   Render `<PageHero title={t('alternatives.hero.title')} subtitle={t('alternatives.hero.subtitle')} color="secondary" />`
    *   Render a section for the "Restaurant Finder". Include `<h2>{t('alternatives.finderTitle')}</h2>`, `<p>{t('alternatives.finderDesc')}</p>`. Add input field (`placeholder={t('alternatives.finderPlaceholder')}`) and button (`{t('alternatives.finderButton')}`). Add note `t('alternatives.finderComingSoon')`. *(Note: Full finder functionality is out of scope for this migration, just implement the UI).*
    *   Render `<ContentSection title={t('alternatives.whyChooseTitle')} bgColor="light">`. Use a grid layout (e.g., `md:grid-cols-2`) for "For Restaurants" (`t('alternatives.whyChooseRestaurantsTitle')`, list `t('alternatives.whyChooseRestaurantsList.*')`) and "For Workers" (`t('alternatives.whyChooseWorkersTitle')`, list `t('alternatives.whyChooseWorkersList.*')`).
    *   Render `<ContentSection title={t('alternatives.directOrderingTitle')} bgColor="white">`. Include description `t('alternatives.directOrderingDesc')`. Use a grid (e.g., `md:grid-cols-3`) for methods: `t('alternatives.directOrderingMethods.websitesTitle')` + `Desc`, `phoneTitle` + `Desc`, `pickupTitle` + `Desc`.
    *   Render final CTA section linking to `/pledge`.
*   `[ ]` **Implement Pledge Page (`app/pledge/page.tsx`):**
    *   Import necessary components, including `PledgeForm`. Get `t` function. Use `useState` for `submitted` state.
    *   Render `<PageHero title={submitted ? t('pledge.hero.titleSuccess') : t('pledge.hero.title')} subtitle={submitted ? t('pledge.hero.subtitleSuccess') : t('pledge.hero.subtitle')} color="primary" />`
    *   Use `<AnimatePresence>` and conditional rendering based on `submitted` state.
    *   **If NOT submitted:** Render layout (e.g., `md:grid-cols-5`). Left side (`md:col-span-3`): `<h2>{t('pledge.whyPledgeTitle')}</h2>`, paragraph `t('pledge.whyPledgeDesc')`, list `t('pledge.whyPledgeList.*')`, impact box `t('pledge.pledgeImpactTitle')`, list `t('pledge.pledgeImpactList.*')`, note `t('pledge.privacyNote')`. Right side (`md:col-span-2`): Render `<PledgeForm onSuccess={handleSuccess} />`.
    *   **If submitted:** Render success message container. Include SVG checkmark icon, `<h2>{t('pledge.successMessage')}</h2>`, paragraphs `t('pledge.successVerification')`, `t('pledge.successSpam')`. Add "What's Next?" section `<h3>{t('pledge.whatsNextTitle')}</h3>`, description `t('pledge.whatsNextDesc')`, and buttons linking to `/alternatives`, `/restaurants`, `/workers`.
*   `[ ]` **Implement Contact Page (`app/contact/page.tsx`):**
    *   Import necessary components. Get `t` function. Use `useState` for form data and submission status.
    *   Render `<PageHero title={t('contact.hero.title')} subtitle={t('contact.hero.subtitle')} color="secondary" />`
    *   Render main section. Conditionally render success message or form based on submission status.
    *   **Form:** Include `<h2>{t('contact.formTitle')}</h2>`. Create fields for Name (`label={t('contact.formNameLabel')}`), Email (`label={t('contact.formEmailLabel')}`), Subject (Dropdown with options from `t('contact.formSubjectOptions.*')`, `label={t('contact.formSubjectLabel')}`), Message (`label={t('contact.formMessageLabel')}`). Use appropriate `components/ui` inputs/textarea/select. Add submit button (`{isSubmitting ? t('contact.formSubmitting') : t('contact.formButton')}`). Implement `handleSubmit` function (console log is sufficient for now).
    *   **Success Message:** Include icon, `<h2>{t('contact.successTitle')}</h2>`, `<p>{t('contact.successMessage')}</p>`, "Send Another Message" button.
    *   Render `<ContentSection title={t('contact.mediaTitle')} bgColor="light">`. Include description `t('contact.mediaDesc')`, list `t('contact.mediaList.*')`, contact info `t('contact.mediaContact')` (render email link correctly).
    *   Render `<ContentSection title={t('contact.partnershipTitle')} bgColor="white">`. Include description `t('contact.partnershipDesc')`, grid for items (`t('contact.partnershipItems.*Title')` + `Desc`), contact info `t('contact.partnershipContact')`.
    *   Render `<ContentSection title={t('contact.faqTitle')} bgColor="light">`. List Q&A pairs using `t('contact.faqItems.*')`.
*   `[ ]` **Implement Privacy Page (`app/privacy/page.tsx`):**
    *   Import necessary components. Get `t` function.
    *   Render `<PageHero title={t('privacy.hero.title')} subtitle={t('privacy.hero.subtitle')} color="secondary" />`
    *   Render multiple `<ContentSection>` components for each topic:
        *   Overview (`t('privacy.overviewTitle')`, `P1`, `P2`)
        *   What Info (`t('privacy.whatInfoTitle')`, `Desc`, `ProvidedTitle`, `ProvidedList.*`, `AutoTitle`, `AutoList.*`)
        *   How Use (`t('privacy.howUseTitle')`, `Desc`, `List.*`, `LegalBasisTitle`, `Desc`, `List.*`)
        *   How Share (`t('privacy.howShareTitle')`, `Desc`, `List.*`)
        *   Retention/Security (`t('privacy.retentionSecurityTitle')`, `RetentionTitle`, `Desc`, `List.*`, `SecurityTitle`, `Desc`, `List.*`)
        *   Rights (`t('privacy.rightsTitle')`, `Desc`, `List.*`, `Contact` with email link)
        *   Cookies (`t('privacy.cookiesTitle')`, `P1`, `P2`, `P3`)
        *   Changes (`t('privacy.changesTitle')`, `P1`, `P2`)
        *   Contact (`t('privacy.contactTitle')`, `Desc`, `Email`, `Complaint`)
*   `[ ]` **Implement Verify Page (`app/verify/page.tsx`):**
    *   Import necessary components, `useSearchParams`, `useEffect`, `useState`, `Link`, `WoltButton`. Get `t` function.
    *   Use `useSearchParams` to get the `token`.
    *   Use `useState` for `status` ('loading', 'success', 'error'), `message`, and `count`.
    *   Implement `useEffect` hook to call `/api/verify?token={token}` on mount.
    *   Update `status` and `message` based on API response. Fetch count on success using `getVerifiedCount` from `lib/supabase.ts`.
    *   Conditionally render `<PageHero>` based on `status` using `t('verify.heroLoading.title')`, `t('verify.heroSuccess.title')`, `t('verify.heroError.title')` etc.
    *   Render main section. Display status-specific content:
        *   Loading: Spinner, `t('verify.statusLoading')`.
        *   Success: Checkmark icon, `t('verify.statusSuccess')`. Display count if available: `t('verify.successCountPart1')` + `count` + `t('verify.successCountPart2')`. Add thank you paragraph `t('verify.successThankYou')`. Add buttons linking to `/` and `/alternatives`.
        *   Error: Error icon, `{message}` (using state). Add instruction `t('verify.errorInstruction')`. Add buttons linking to `/` and `/pledge` (`t('common.button.tryAgain')`).

---

### Phase 4: Component Implementation & Feature Integration

*   `[ ]` **Implement Comparison Tables:**
    *   **Worker Table (`app/workers/page.tsx`):**
        *   Import `ComparisonTable`.
        *   Define the `workerConditionsData` array within the component using the extracted headers and data. Use translation keys for labels (e.g., `label: t('workers.table.employmentStatus')`). Use plain strings/numbers for data values (e.g., `wolt: t('workers.table.woltValuePartner')`, `justEat: t('workers.table.justEatValueYes')`). Set `woltHighlight`, `justEatHighlight`, `directHighlight` based on whether the value is negative (True) or positive (False) for workers' rights.
        *   Render `<ComparisonTable title={t('workers.table.comparisonTableTitle')} items={workerConditionsData} colorScheme="workers" />`.
    *   **Pricing Tables (`app/pricing/page.tsx`):**
        *   Import `ComparisonTable`.
        *   Define `feeComparisonData` array. Use `t('pricing.table.*')` for labels. Set `woltHighlight: true` for Wolt's generally higher fees/restrictive policies.
        *   Define `orderComparisonData` array. Use `t('pricing.table.*')` for labels. Set `unit: ' kr'`. Set `woltHighlight: true` for rows where Wolt is worse (Markup, Delivery Fee, Service Fee, Total).
        *   Render `<ComparisonTable title={t('pricing.table.comparisonTableTitle')} items={feeComparisonData} colorScheme="fees" />`.
        *   Render `<ComparisonTable title={t('pricing.table.realCostTitle')} description={t('pricing.table.realCostDesc')} items={orderComparisonData} colorScheme="fees" />`.
*   `[ ]` **Implement Pledge Form Component (`src/components/PledgeForm.tsx`):**
    *   Ensure the component exists or create it.
    *   Use `components/ui/input`, `textarea`, `label`, `button`.
    *   Implement state for `name`, `email`, `comment`, `isSubmitting`, `error`, `success`, `verificationUrl`.
    *   Use translation keys for labels and placeholders (e.g., `label={t('pledge.formNameLabel')}`).
    *   Implement `handleSubmit` function:
        *   Perform basic validation (name/email required, email format). Use `t('pledge.errorMessages.*')` for errors.
        *   Call `fetch('/api/pledge', ...)` with form data.
        *   Handle success: set `success`, clear form, store `verificationUrl` if present in response, call `onSuccess`.
        *   Handle errors: set `error` state with message from response or default, call `onError`.
    *   Conditionally render error/success/dev link messages using `<AnimatePresence>` and `<motion.div>`. Use icons (`CheckCircle`, `AlertCircle`, `Loader2`).
    *   Style the submit button with loading state (`t('pledge.formSubmitting')`).
*   `[ ]` **Implement Pledge API Route (`app/api/pledge/route.ts`):**
    *   Create the file.
    *   Import `NextRequest`, `NextResponse`, `createPledge` from `lib/supabase.ts`.
    *   Define `POST` handler.
    *   Parse JSON body: `const { name, email, comment } = await request.json();`
    *   Basic validation: return `400` if name/email missing.
    *   Email format validation: return `400` if invalid.
    *   Get IP/User Agent (optional but good practice): `request.headers.get(...)`.
    *   Call `createPledge({ name, email, comment, ipAddress, userAgent, locale })`.
    *   Handle `createPledge` response:
        *   If `!result.success`, return `500` or `409` (if email exists) with `result.message`.
        *   If dev mode and `result.verificationToken`, return `200` with `{ ...result, dev: { verificationUrl: ... } }`.
        *   Otherwise, return `200` with `{ success: true, message: result.message }`. *(Security Note: Don't return the token itself unless in dev mode)*.
    *   Add error handling (`try...catch`).
*   `[ ]` **Implement Verification API Route (`app/api/verify/route.ts`):**
    *   Create the file.
    *   Import `NextRequest`, `NextResponse`, `verifyPledge` from `lib/supabase.ts`.
    *   Define `GET` handler.
    *   Get token from search params: `const token = request.nextUrl.searchParams.get('token');`
    *   Validate token presence: return `400` if missing.
    *   Call `verifyPledge(token)`.
    *   Return `200` with the result (`{ success: result.success, message: result.message }`).
    *   Add error handling (`try...catch`).
*   `[ ]` **Implement Supabase Library (`lib/supabase.ts`):**
    *   Ensure the file exists and correctly initializes the Supabase client using `process.env.NEXT_PUBLIC_SUPABASE_URL` and `_ANON_KEY`.
    *   Implement or verify the `isSupabaseConfigured` check.
    *   Implement or verify the `createPledge` function:
        *   Check `isSupabaseConfigured`.
        *   Check for existing verified pledge using `supabase.from('pledges').select(...).eq('email', email).eq('verified', true)`. Return error if found.
        *   Use `supabase.from('pledges').upsert(...)` with `onConflict: 'email'` to handle cases where an unverified pledge exists. Insert/update `name`, `email`, `comment`, `verified: false`, `verification_token: crypto.randomUUID()`, `ip_address`, `user_agent`, `locale`.
        *   Select `verification_token` after upsert.
        *   Handle potential `ADMIN_EMAIL` auto-verification.
        *   Return `{ success: true/false, message: string, verificationToken?: string, autoVerified?: boolean }`.
    *   Implement or verify the `verifyPledge` function:
        *   Check `isSupabaseConfigured`.
        *   Call the Supabase RPC function: `supabase.rpc('verify_pledge', { token })`. *(This assumes the SQL function exists)*.
        *   Return `{ success: boolean, message: string }`.
    *   Implement or verify the `getVerifiedCount` function:
        *   Check `isSupabaseConfigured`.
        *   Call the Supabase RPC function: `supabase.rpc('get_verified_pledge_count')`. *(This assumes the SQL function exists)*.
        *   Return `{ count: number }`.
    *   Ensure the dummy client is correctly implemented for when Supabase is not configured.
*   `[ ]` **Implement Supabase Types (`types/supabase.ts`):**
    *   Ensure the file exists and defines the `Database` type matching the `pledges` table columns and the RPC functions (`verify_pledge`, `get_verified_pledge_count`) defined in `supabase/pledges_schema.sql`.

---

### Phase 5: Navigation & Linking

*   `[ ]` **Update Header Navigation (`components/Header.tsx`):**
    *   Locate the `nav` element (hidden on mobile).
    *   Modify the array or list of links to include: Home (`/`), About (`/about`), Pricing (`/pricing`), Workers (`/workers`), Restaurants (`/restaurants`), Alternatives (`/alternatives`), Contact (`/contact`).
    *   Use the `t()` function for link labels: `label: t('common.nav.about')`, etc.
    *   Ensure the "Sign the Pledge" button (`<WoltButton>`) correctly links to `/pledge` and uses `t('common.nav.pledge')` for its text.
*   `[ ]` **Update Mobile Menu (`components/MobileMenu.tsx`):**
    *   Locate the navigation links within the mobile menu component.
    *   Update the `href` attributes and link text using `t()` to match the main header navigation.
    *   Ensure the "Sign the Pledge" button links to `/pledge` and uses `t('common.nav.pledge')`.
*   `[ ]` **Verify Internal Links:**
    *   Check all `<Link href="...">` components added in Phase 3 (within `ContentSection`, `InfoCard`, CTA buttons) point to the correct page paths (e.g., `/pricing`, `/workers`, `/pledge`, `/alternatives`).

---

### Phase 6: Final Review & Cleanup

*   `[ ]` **Visual Consistency Check:**
    *   Browse through all created pages (`/`, `/about`, `/pricing`, `/workers`, `/restaurants`, `/alternatives`, `/pledge`, `/contact`, `/privacy`, `/verify`).
    *   Verify consistent use of fonts (Omnes for headings/buttons, Inter/sans for body), colors (Wolt Cyan accents, grays for text/backgrounds), spacing, and component styles (buttons, cards, tables).
    *   Check dark mode appearance on all pages.
*   `[ ]` **Content Verification:**
    *   Proofread English text on all pages for accuracy and clarity.
    *   Proofread Danish text on all pages for accuracy and clarity.
    *   Ensure citations are correctly placed and link to appropriate sources (if applicable, or display source text correctly).
*   `[ ]` **Functionality Testing:**
    *   Test the Pledge Form submission (check console for dev link or verify email process if configured).
    *   Test the `/verify` page by clicking the verification link.
    *   Test theme switching (light/dark).
    *   Test language switching (EN/DA) on multiple pages to ensure content updates correctly.
    *   Test all navigation links in header and footer.
    *   Test any interactive elements (buttons, links).
*   `[ ]` **Responsiveness Check:**
    *   Resize the browser window or use browser developer tools to simulate different screen sizes (mobile, tablet, desktop).
    *   Ensure layout adapts correctly, text remains readable, navigation works (mobile menu), and tables are scrollable.
*   `[ ]` **Code Cleanup:**
    *   Remove any unused components (`FeatureCard.tsx` if fully replaced).
    *   Remove commented-out code.
    *   Run `npm run lint` and `npm run format` one last time.
*   `[ ]` **Check Supabase Configuration:** Confirm RLS policies are enabled on the `pledges` table in the Supabase dashboard. Confirm RPC functions exist.

---

This checklist provides a detailed roadmap for the AI assistant to integrate the required content and functionality into the new website structure, adhering to the specified styling and requirements.