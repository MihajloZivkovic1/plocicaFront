import React from 'react';

export function EventWalkthrough() {
  return (
    <div className="text-sm leading-loose text-muted-foreground">
      <p><strong>Šta je pomen?</strong></p>
      <p>Pomen je verski obred i čin sećanja na preminulu osobu, koji se obavlja u skladu sa običajima i tradicijom. Obično se organizuje na određene datume, kao što su četrdesetodnevni pomen, šestomesečni pomen ili godišnjica smrti.</p>
      <p className="mt-2"><strong>Kako da unesem pomen?</strong></p>
      <p>Na stranici za uređivanje pomena možete:</p>
      <ol className="list-decimal list-inside space-y-1 mt-2">
        <li><strong>Kliknite na &quot;Dodaj novi pomen&quot;:</strong> Dodajte novi pomen klikom na dugme.</li>
        <li><strong>Izaberite vrstu pomena:</strong> Odaberite koji je pomen u pitanju, npr. četrdesetodnevni, godišnji, ili drugi.</li>
        <li><strong>Unesite lokaciju pomena:</strong> Navedite gde će se pomen održati.</li>
        <li><strong>Unesite datum i vreme:</strong> Odredite tačan datum i vreme kada će pomen biti održan.</li>
        <li><strong>Sačuvajte pomen:</strong> Kliknite na <em>Sačuvaj pomen</em> kako biste sačuvali detalje.</li>
      </ol>
    </div>
  );
}
