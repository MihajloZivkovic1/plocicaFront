import React from 'react';

export function EventWalkthrough() {
  return (
    <div className="text-sm leading-loose text-muted-foreground">
      <p><strong>Šta je pomen?</strong></p>
      <p>
        Pomen je verski obred i čin sećanja na preminulu osobu, organizovan u skladu sa tradicijom, na datume poput
        četrdesetodnevnog pomena, šestomesečnog pomena ili godišnjice smrti.
      </p>
      <p className="mt-2"><strong>Kako da unesem pomen?</strong></p>
      <p>Na stranici za uređivanje pomena možete:</p>
      <ol className="list-decimal list-inside space-y-1 mt-2">
        <li>
          <strong>Dodati novi pomen:</strong> Kliknite na dugme <em>Dodaj novi pomen</em>.
        </li>
        <li>
          <strong>Odabrati vrstu pomena:</strong> Izaberite tip (npr. četrdesetodnevni ili godišnji pomen).
        </li>
        <li>
          <strong>Uneti detalje:</strong> Dodajte lokaciju, datum i vreme održavanja pomena.
        </li>
        <li>
          <strong>Sačuvati pomen:</strong> Kliknite na <em>Sačuvaj pomen</em> kako biste potvrdili izmene.
        </li>
      </ol>
    </div>
  );
}
