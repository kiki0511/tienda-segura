# tienda-segura — TP 4 Integración Continua (DevSecOps)

Pipeline de GitHub Actions que corre en cada pull request y bloquea código inseguro.

| Paso del pipeline | Qué comprueba | Concepto |
|---|---|---|
| `npm test` | que la lógica sigue funcionando | Pruebas automáticas |
| `npm audit --audit-level=high` | CVE conocidos en librerías | SCA |
| `semgrep scan --config auto --error` | patrones peligrosos en el código | SAST |
| `gitleaks` | claves/tokens en código e historial | Secretos |
| `trivy config` (reto 2) | Dockerfile mal configurado (root) | IaC / contenedores |
| `ZAP baseline` (reto 3) | la app corriendo, atacada desde afuera | DAST |

Reto 1: `main` protegida con *Require status checks to pass* → check `verificar`.

## Correr local
```bash
npm ci
npm test          # pass 1, fail 0
node app.js       # http://localhost:3000/total?p=10&c=3  -> {"total":30}
```

## Las 4 fallas plantadas (una rama + una PR cada una)
| Rama | Cambio | Puerta en rojo |
|---|---|---|
| `falla-secreto` | `const TOKEN = "ghp_aB3dE6gH9jK2mN5pQ8sT1vW4yZ7cF0hJ3kL6";` | Gitleaks |
| `falla-codigo` | ruta `/calcular` con `eval(req.query.expr)` | Semgrep |
| `falla-libreria` | `npm install lodash@4.17.15` | npm audit |
| `falla-test` | `(1 + desc)` en vez de `(1 - desc)` | npm test (esperaba 100, recibió 300) |

La del secreto **no se arregla borrando la línea**: queda en el historial. Se cierra la PR sin fusionar, se borra la rama y en la vida real se revoca la clave.

