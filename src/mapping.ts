import {YfiEvent} from "../generated/schema";
import {ethereum} from "@graphprotocol/graph-ts/chain/ethereum"
import {
    RewardPaid,
    Staked,
    Withdrawn
} from "../generated/YearnGovernance/YearnGovernance";

export function handleStaked(event: Staked): void {
    let id = event.transaction.hash.toHexString().concat('-').concat(event.logIndex.toString())
    let yfiEvent = new YfiEvent(id)
    yfiEvent.txHash = event.transaction.hash
    yfiEvent.eventType = "STAKE"
    yfiEvent.amount = event.params.amount
    setPropertiesAndSave(event, yfiEvent)
}

export function handleRewardPaid(event: RewardPaid): void {
    let id = event.transaction.hash.toHexString().concat('-').concat(event.logIndex.toString())
    let yfiEvent = new YfiEvent(id)
    yfiEvent.txHash = event.transaction.hash
    yfiEvent.eventType = "REWARD"
    yfiEvent.amount = event.params.reward
    setPropertiesAndSave(event, yfiEvent)
}

export function handleWithdrawn(event: Withdrawn): void {
    let id = event.transaction.hash.toHexString().concat('-').concat(event.logIndex.toString())
    let yfiEvent = new YfiEvent(id)
    yfiEvent.txHash = event.transaction.hash
    yfiEvent.eventType = "WITHDRAWAL"
    yfiEvent.amount = event.params.amount
    setPropertiesAndSave(event, yfiEvent)
}

function setPropertiesAndSave(event: ethereum.Event, yfiEvent: YfiEvent): void {
    yfiEvent.user = event.transaction.from
    yfiEvent.blockNumber = event.block.number
    yfiEvent.blockTimestamp = event.block.timestamp
    yfiEvent.save()
}