# Ummah Builders — WordPress + Elementor

Publieke website (home, manifest, roadmap) als WordPress-thema met Elementor-templates.
De ledenapp (dashboard, netwerk, kennisbank, evenementen) blijft een aparte app; de knoppen
**Inloggen** en **Word lid** linken ernaartoe.

Alles werkt met de **gratis** versie van Elementor.

## Inhoud

| Pad | Wat |
|---|---|
| `dist/ummah-builders-theme.zip` | Child-thema om te uploaden |
| `templates/*-nl.json`, `templates/*-en.json` | Elementor-templates: home, manifest, roadmap |
| `ummah-builders-theme/` | Broncode van het thema |
| `tools/build_templates.py` | Maakt de templates en de zip opnieuw aan |

## Installatie

1. **Plugins en hoofdthema**
   - Installeer het thema **Hello Elementor** (Weergave → Thema's → Nieuwe toevoegen).
   - Installeer de plugins **Elementor** en **Polylang** (voor Nederlands/Engels).
2. **Thema**: Weergave → Thema's → Nieuwe toevoegen → Thema uploaden → `ummah-builders-theme.zip` → activeren.
3. **Elementor-instellingen**: Elementor → Instellingen → vink **Standaardkleuren uitschakelen** en
   **Standaardlettertypen uitschakelen** aan. Anders overschrijft Elementor de huisstijl van het thema.
4. **Talen**: Talen → voeg Nederlands (standaard) en English toe.
5. **Templates importeren**: Templates → Opgeslagen templates → Templates importeren → kies de 6 JSON-bestanden.
6. **Pagina's maken** (per taal één pagina, en koppel ze aan elkaar in Polylang):

   | NL-pagina | EN-pagina | Template |
   |---|---|---|
   | Home | Home | `home-nl` / `home-en` |
   | Manifest (slug `manifest`) | Manifesto (slug `manifesto`) | `manifest-nl` / `manifest-en` |
   | Roadmap (slug `roadmap`) | Roadmap (slug `our-roadmap`) | `roadmap-nl` / `roadmap-en` |

   Met de gratis Polylang moet elke slug uniek zijn; daarom heet de Engelse roadmap `our-roadmap`.

   Open de pagina met **Bewerken met Elementor** → map-icoon → **Mijn templates** → **Invoegen**.
   Zet bij Pagina-instellingen de lay-out op **Elementor Volledige breedte**.
7. **Permalinks**: Instellingen → Permalinks → kies **Berichtnaam**. Anders werken adressen als `/manifest/` niet.
8. **Startpagina**: Instellingen → Lezen → Een statische pagina → Home.
9. **Menu's**: Weergave → Menu's. Maak per taal een hoofdmenu (bv. Manifest, Roadmap) en wijs het
   toe aan *Hoofdmenu*; optioneel een footermenu (privacy, contact).
10. **Link naar de ledenapp**: Weergave → Customizer → *Ummah Builders ledenapp* → vul de URL in
   (bv. `https://app.ummahbuilders.be`).

## Zelf aanpassen in Elementor

- Teksten, knoppen en volgorde van secties pas je gewoon aan in Elementor.
- De opmaak zit in CSS-klassen van het thema. Geef een element in Elementor via
  **Geavanceerd → CSS-klassen** een van deze klassen:

  | Klasse | Op | Effect |
  |---|---|---|
  | `ub-section`, `ub-section--tight` | sectie | ruime of compacte verticale witruimte |
  | `ub-bg-paper`, `ub-bg-cream`, `ub-bg-night` | sectie | witte, crème of donkere achtergrond |
  | `ub-hero`, `ub-cta` | sectie | hero bovenaan, donker afsluitblok |
  | `ub-eyebrow`, `ub-title`, `ub-hero-title`, `ub-badge` | kop | labeltje, sectietitel, grote titel, badge |
  | `ub-step-number`, `ub-step-title` | kop | genummerde stappen |
  | `ub-card` | pictogramvak | kaart met rand en pictogram |
  | `ub-stat` | teller | groot cijfer met label |
  | `ub-btn-primary`, `ub-btn-ghost`, `ub-btn-light` | knop | knopstijlen |

- Woorden schuin en in goud zetten in een titel: zet ze tussen `<em>` en `</em>`.
- Een knop naar de ledenapp: gebruik als link `#ub-login` (inloggen) of `#ub-join` (lid worden).

## Templates opnieuw genereren

Teksten staan in `tools/build_templates.py`. Na een wijziging:

```bash
python wordpress/tools/build_templates.py
```

Let op: opnieuw importeren maakt een nieuw template aan; wijzigingen die je in Elementor zelf
deed, worden niet overschreven.

## Gratis online zetten (statische site op Cloudflare Pages)

Je bewerkt de site in een WordPress op je eigen pc en publiceert een statische kopie (gewone
HTML-bestanden). Online staat dus geen WordPress: snel, veilig en gratis.

### Eenmalig: lokale WordPress opzetten

Vereist: [Docker Desktop](https://www.docker.com/products/docker-desktop/). In de map `wordpress/local`:

```bash
docker compose up -d
docker compose run --rm cli core install --url=http://localhost:8080 --title="Ummah Builders" --admin_user=admin --admin_password=KIES-EEN-WACHTWOORD --admin_email=jij@example.com --skip-email
docker compose run --rm cli theme install hello-elementor
docker compose run --rm cli plugin install elementor polylang simply-static --activate
docker compose run --rm cli theme activate ummah-builders
docker compose run --rm cli rewrite structure /%postname%/
docker compose run --rm cli eval-file /tools/local-test-setup.php
docker compose run --rm cli eval "PLL()->model->clean_languages_cache(); flush_rewrite_rules();"
```

> In Git Bash op Windows: zet eerst `export MSYS_NO_PATHCONV=1`, anders worden paden als
> `/tools/...` verkeerd omgezet. In PowerShell is dat niet nodig.

Het setupscript maakt de pagina's (NL + EN), de menu's, de Polylang-talen en de Simply Static-
instellingen aan. Daarna: http://localhost:8080 (site) en http://localhost:8080/wp-admin (beheer).

### Elke keer dat je iets wil publiceren

1. Pas de site aan in Elementor op http://localhost:8080/wp-admin.
2. Ga naar **Simply Static → Generate** en klik op **Push**. Wacht tot "Done!" verschijnt
   (ongeveer 1 à 2 minuten). De bestanden staan dan in `wordpress/local/export`.
3. Publiceer, vanuit de projectmap:

   ```bash
   npx wrangler pages deploy wordpress/local/export --project-name ummahbuilders
   ```

   De eerste keer opent `wrangler` je browser om in te loggen bij Cloudflare (gratis account) en
   vraagt het om het project aan te maken. Daarna staat de site op
   `https://ummahbuilders.pages.dev`.

**Alternatief zonder commandoregel:** `python wordpress/tools/zip_export.py` maakt
`wordpress/dist/ummahbuilders-site.zip`. Sleep die naar https://app.netlify.com/drop
(gratis Netlify-account) voor een site op `*.netlify.app`.

### De ledenapp

De React-app (dashboard, netwerk, kennisbank) is een apart project:

```bash
npm run build
npx wrangler pages deploy dist --project-name ummahbuilders-app
```

Die komt op `https://ummahbuilders-app.pages.dev`. Vul dat adres daarna in bij
**Weergave → Customizer → Ummah Builders ledenapp** en publiceer de site opnieuw, zodat
"Inloggen" en "Word lid" ernaartoe linken.

### Eigen domein

Koop een domein (bv. `ummahbuilders.be`, ±€10/jaar) en voeg het in Cloudflare toe via
**Workers & Pages → ummahbuilders → Custom domains**. Doe hetzelfde met `app.ummahbuilders.be`
voor de ledenapp.
