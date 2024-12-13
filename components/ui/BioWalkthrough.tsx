import React from 'react';

export function BioWalkthrough() {
  return (
    <div className="text-sm leading-loose text-muted-foreground">
      <p>Na stranici za uređivanje biografije možete:</p>
      <ol className="list-decimal list-inside space-y-1 mt-2">
        <li>
          <strong>Uređivanje teksta:</strong> Koristite tekstualni editor za dodavanje ili izmenu biografije. Takođe, možete podebljati ili podvući tekst prema potrebi.
        </li>
        <li>
          <strong>Čuvanje izmena:</strong> Kliknite na <em>Sačuvaj biografiju</em> da biste potvrdili izmene i nastavili uređivanje pomena.
        </li>
      </ol>
    </div>
  );
}
