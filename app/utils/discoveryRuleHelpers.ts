export function canRevealArtifactLearningContent(discovered: boolean) {
  return discovered;
}

export function canUseArtifactForLearningChallenge(discovered: boolean) {
  return discovered;
}

export function getLockedLearningContentMessage() {
  return '继续探索，发现后解锁学习内容';
}

export function warnIfLearningContentBlocked({
  artifactId,
  context,
  discovered,
}: {
  artifactId: string;
  context: string;
  discovered: boolean;
}) {
  if (discovered || process.env.NODE_ENV === 'production') {
    return;
  }

  console.warn('Discovery Rule blocked locked learning content', {
    artifactId,
    context,
  });
}
