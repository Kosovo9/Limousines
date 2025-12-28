<section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-emerald-400 p-6 font-mono">
  <div className="max-w-5xl w-full border border-emerald-500/30 p-8 rounded bg-black/50 backdrop-blur-sm relative overflow-hidden">
    {/* Decorative scanline */}
    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 animate-pulse"></div>

    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="flex-1 text-left">
        <div className="text-xs tracking-[0.3em] text-emerald-600 mb-2">SECURE TRANSPORT DIVISION</div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">VIP ARMORED</h1>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          Nivel de blindaje B4 a B7 disponible. Vidrio balístico multicapa.
          Sistemas run-flat. Choferes con entrenamiento táctico defensivo/evasivo.
          Discreción total garantizada.
        </p>

        <div className="space-y-4 text-emerald-200/80 text-sm">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span>PROTECCIÓN BALÍSTICA 360°</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span>SALIDA DE EMERGENCIA OCULTA</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span>COMUNICACIÓN SATELITAL ENCRIPTADA</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="bg-gray-800 p-6 rounded border-l-4 border-emerald-500">
          <h3 className="text-xl text-white font-bold mb-4">SOLICITUD DE ESCOLTA</h3>
          <div className="space-y-3">
            <input type="text" placeholder="ID CORPORATIVO (Opcional)" className="w-full bg-black border border-gray-700 p-3 text-white focus:border-emerald-500 outline-none" />
            <select className="w-full bg-black border border-gray-700 p-3 text-white focus:border-emerald-500 outline-none">
              <option>Nivel de Amenaza: BAJO</option>
              <option>Nivel de Amenaza: MEDIO</option>
              <option>Nivel de Amenaza: ALTO</option>
            </select>
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-4 mt-2 transition">
              INICIAR PROTOCOLO DE RESERVA
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
