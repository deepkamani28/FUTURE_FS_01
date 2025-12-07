"use client"

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  achievement: {
    title: string
    year: string
    description: string
    certificateUrl: string
  } | null
}

export default function CertificateModal({ isOpen, onClose, achievement }: CertificateModalProps) {
  if (!isOpen || !achievement) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-card border border-accent/30 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-in fade-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-accent/20 flex justify-between items-center sticky top-0 bg-card/95 backdrop-blur-sm">
            <div>
              <p className="text-sm font-semibold gradient-text mb-1">{achievement.year}</p>
              <h2 className="text-2xl font-bold text-foreground">{achievement.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent/10 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-8">
            <p className="text-muted-foreground mb-6">{achievement.description}</p>

            <div className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-xl border border-accent/20 p-6 flex items-center justify-center min-h-96">
              <iframe
                src={achievement.certificateUrl}
                className="w-full h-[500px] rounded-lg"
                title="Certificate PDF"
                style={{border:"none"}}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={achievement.certificateUrl}
                download
                className="flex-1 px-4 py-3 bg-gradient-to-r from-accent to-secondary text-background font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Download Certificate
              </a>
              <button
                onClick={onClose}
                className="px-4 py-3 border border-accent/30 text-foreground font-semibold rounded-lg hover:bg-accent/10 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
