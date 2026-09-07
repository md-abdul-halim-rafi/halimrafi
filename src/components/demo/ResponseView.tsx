import { ACCOUNT_RECORD } from '@/demo/fixtures'
import type { Inline, ResponseState, Segment } from '@/demo/types'

function InlineRun({ run }: { run: Inline }) {
  if (run.type === 'strong') return <strong className="font-semibold">{run.value}</strong>
  if (run.type === 'code')
    return (
      <code className="rounded-[2px] bg-sunk px-1 py-0.5 font-mono text-[0.9em] text-ink/85">
        {run.value}
      </code>
    )
  return <>{run.value}</>
}

function Inlines({ content }: { content: Inline[] }) {
  return (
    <>
      {content.map((run, i) => (
        <InlineRun key={i} run={run} />
      ))}
    </>
  )
}

/** The record the tool returns once it resolves. */
function ResolvedRecord() {
  return (
    <div className="h-full rounded-[var(--radius)] border border-[color:var(--hairline)] bg-surface">
      <div className="flex items-baseline justify-between gap-3 border-b border-[color:var(--hairline)] px-4 py-2.5">
        <span className="font-medium">{ACCOUNT_RECORD.name}</span>
        <span className="label">Account</span>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3 text-sm sm:grid-cols-4">
        {[
          ['Stage', ACCOUNT_RECORD.stage],
          ['Owner', ACCOUNT_RECORD.owner],
          ['Seats', ACCOUNT_RECORD.seats],
          ['Last touch', ACCOUNT_RECORD.lastTouch],
        ].map(([term, value]) => (
          <div key={term}>
            <dt className="label">{term}</dt>
            <dd className="mt-0.5 text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function PendingRecord({ overdue, label }: { overdue: boolean; label: string }) {
  return (
    <div className="flex h-full flex-col justify-center rounded-[var(--radius)] border border-dashed border-[color:var(--hairline-strong)] bg-sunk/60 px-4 py-3">
      <p className="text-sm text-muted">
        {overdue ? 'Still waiting on the account record.' : `${label}…`}
      </p>
      {overdue ? (
        <p className="mt-1 text-sm text-muted/80">
          The rest of the answer is finished. This panel fills in when the result lands.
        </p>
      ) : null}
    </div>
  )
}

/**
 * Stacks children in a single grid cell so the container is as tall as the
 * tallest of them. Used to hold space for content that has not arrived yet.
 */
function Reserve({ ghost, children }: { ghost: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
      <div aria-hidden className="invisible">
        {ghost}
      </div>
      <div>{children}</div>
    </div>
  )
}

function AccountWidget({ pending, overdue, label }: { pending: boolean; overdue: boolean; label: string }) {
  // The slot is sized by the record it is waiting for, not by the placeholder
  // text inside it. That is what makes the arrival move nothing below it.
  return (
    <div className="my-4">
      <Reserve ghost={<ResolvedRecord />}>
        {pending ? <PendingRecord overdue={overdue} label={label} /> : <ResolvedRecord />}
      </Reserve>
    </div>
  )
}

function SegmentView({ segment }: { segment: Segment }) {
  if (segment.kind === 'widget') {
    const state = segment.state
    return state.status === 'pending' ? (
      <AccountWidget pending overdue={state.overdue} label={state.label} />
    ) : (
      <AccountWidget pending={false} overdue={false} label="" />
    )
  }

  return (
    <>
      {segment.blocks.map((block, i) =>
        block.type === 'paragraph' ? (
          <p key={i} className="mt-3 leading-[1.65] first:mt-0">
            <Inlines content={block.content} />
          </p>
        ) : (
          <ul key={i} className="mt-3 space-y-1.5">
            {block.items.map((item, j) => (
              <li
                key={j}
                className="relative pl-5 leading-[1.6] before:absolute before:left-1 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-signal"
              >
                <Inlines content={item} />
              </li>
            ))}
          </ul>
        ),
      )}
    </>
  )
}

/**
 * Pure renderer for a projected response. Used unchanged for the server-rendered
 * completed transcript and for every frame of playback.
 */
export function ResponseView({ state }: { state: ResponseState }) {
  return (
    <div className="text-[0.9375rem] text-ink sm:text-base">
      {state.segments.map((segment, i) => (
        <SegmentView key={i} segment={segment} />
      ))}
      {state.footer ? (
        <p className="mt-4 border-t border-[color:var(--hairline)] pt-3 text-sm text-muted">{state.footer}</p>
      ) : null}
    </div>
  )
}

export { Reserve }
