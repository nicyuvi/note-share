import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from '@/components/ui/tooltip'

const CustomTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode
  content: string
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{content}</p>
          <TooltipArrow className="fill-black" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default CustomTooltip
