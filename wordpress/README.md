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
   | Roadmap (slug `roadmap`) | Roadmap (slug `roadmap`) | `roadmap-nl` / `roadmap-en` |

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
