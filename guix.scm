; I'm not sure if this is correct usage of guix.scm but it works
; This is an empty package with single node-lts native input
; guix shell loads it faster than `guix shell node-lts`
(use-modules (guix packages)
             (gnu packages)
             (gnu packages node)
             (guix build-system trivial))

(package
 (name "calculadora-puntajes")
 (native-inputs `(("node" ,node-lts)))
 (version "")
 (synopsis #f)
 (description #f)
 (source #f)
 (build-system trivial-build-system)
 (license #f)
 (home-page #f))
