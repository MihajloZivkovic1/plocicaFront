import React from 'react';

export function StoryWalkthrough() {
  return (
    <div className="text-sm leading-loose text-muted-foreground">
      <p>Na stranici za uređivanje priča pokojnika možete:</p>
      <ol className="list-decimal list-inside space-y-2 mt-2">
        <li>
          <strong>Dodati novu priču:</strong> Kliknite na <em>Dodaj novu priču</em> da biste započeli unos.
        </li>
        <li>
          <strong>Uneti naslov:</strong> Dodajte kratak i upečatljiv naslov koji opisuje priču.
        </li>
        <li>
          <strong>Dodati tekst priče:</strong> Napišite anegdotu, važan događaj ili nešto što je karakteristično za pokojnika.
        </li>
        <li>
          <strong>Sačuvati priču:</strong> Kliknite na <em>Sačuvaj priču</em> da biste potvrdili unos.
        </li>
        <li>
          <strong>Urediti postojeće priče:</strong> Koristite opcije za izmenu ili brisanje kako biste ažurirali priče.
        </li>
      </ol>
      <p className="mt-2">
        Zapamtite, cilj je ispričati priče koje će očuvati sećanje na pokojnika na poseban i značajan način.
      </p>
    </div>
  );
}
