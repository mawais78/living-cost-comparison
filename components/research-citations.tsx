import { ExternalLink } from "lucide-react"

import { sourceById } from "@/lib/research"

export function ResearchCitations({ ids, title = "Sources used for this page" }: { ids: string[]; title?: string }) {
  return (
    <section className="research-citations" aria-labelledby="research-sources-title">
      <div>
        <p className="eyebrow">Research notes</p>
        <h2 id="research-sources-title">{title}</h2>
        <p>We link to the original institution so you can inspect the definition, geography and release date—not only our interpretation.</p>
      </div>
      <ol>
        {ids.map((id) => {
          const source = sourceById[id]
          if (!source) return null
          return (
            <li key={source.id}>
              <span>{source.publisher}</span>
              <a href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink aria-hidden="true" /></a>
              <p>{source.caution}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
